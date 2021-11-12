import {Injectable, OnDestroy} from '@angular/core';
import {MediaSessionEvents} from '@core/services/mediasession/mediasession.events';
import {MediaSessionService} from '@core/services/mediasession/mediasession.service';
import {ImageFormatType, Jam, JamObjectType, JamService, PodcastStatus} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotifyService} from '../notify/notify.service';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {QueueService} from '../queue/queue.service';
import {UserStorageService} from '../userstorage/userstorage.service';
import {PlayerEvents, SoundPlayerAudioSupport} from './player.interface';
import {PlayerSoundmanager2} from './player.soundmanager2';

class StopWatch {
	private startAt = 0;	// Time of last start / resume. (0 if not running)
	private lapTime = 0;	// Time on the clock when last stopped in milliseconds

	start(): void {
		this.startAt = this.startAt ? this.startAt : Date.now();
	}

	pause(): void {
		this.lapTime = this.startAt ? this.lapTime + Date.now() - this.startAt : this.lapTime;
		this.startAt = 0;
	}

	reset(): void {
		this.lapTime = 0;
		this.startAt = 0;
	}

	time(): number {
		return this.lapTime + (this.startAt ? Date.now() - this.startAt : 0);
	}
}

@Injectable({
	providedIn: 'root'
})
export class PlayerService implements OnDestroy {
	static localPlayerStorageName = 'player';
	static localQueueStorageName = 'queue';
	currentEpisode?: Jam.Episode;
	currentTrack?: Jam.Track;
	currentMedia?: Jam.MediaBase;
	audioSupport?: SoundPlayerAudioSupport;
	currentTime?: number;
	totalTime?: number;
	isMuted: boolean = false;
	isPlaying = false;
	repeatTrack = false;
	scrobbleWatch = new StopWatch();
	scrobbled = false;
	protected unsubscribe = new Subject();
	private subscribers: {
		[key: number]: Array<(data: any) => void>;
	} = {};
	private positionStoreTimer?: number;
	private soundPlayer = new PlayerSoundmanager2(this.jam);

	constructor(
		private queue: QueueService,
		private notify: NotifyService,
		private notification: PushNotificationService,
		private mediasession: MediaSessionService,
		private userStorage: UserStorageService,
		private jam: JamService
	) {
		this.subscribeSoundPlayerEvents();
		this.subscribeMediaSessionEvents();
		userStorage.userChange
			.pipe(takeUntil(this.unsubscribe)).subscribe((/*user*/) => {
			setTimeout(() => {
				this.loadFromStorage();
			}, 0);
		});
		this.loadFromStorage();
		this.queue.queueChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.syncQueueWithLocalStorage();
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	get empty(): Readonly<boolean> {
		return !(this.currentTrack || this.currentEpisode);
	}

	playQueuePos(index: number): void {
		this.queue.currentIndex = index - 1;
		this.next();
	}

	play(media: Jam.MediaBase, addToQueue = false, startSeek?: number, paused?: boolean): void {
		if (startSeek === undefined && this.isPlaying && this.currentMedia && this.currentMedia.id === media.id) {
			return;
		}
		if (addToQueue) {
			this.queue.add(media);
			this.syncQueueWithLocalStorage();
		}
		this.queue.setIndexByTrack(media);
		this.scrobbled = false;
		this.currentEpisode = undefined;
		this.currentTrack = undefined;
		this.currentMedia = media;
		this.currentTime = (startSeek || 0);
		this.scrobbleWatch.reset();
		if (media.objType === JamObjectType.episode) {
			this.currentEpisode = media as Jam.Episode;
		} else {
			this.currentTrack = media as Jam.Track;
		}
		this.soundPlayer.initialize(media, startSeek, !!paused, e => {
			if (!e) {
				this.setCurrentMedia(media);
				this.setPlaying(!paused);
				this.syncPlayerWithLocalStorage();
			} else {
				this.notify.error(e);
			}
		});
	}

	stop(): void {
		if (this.currentMedia !== undefined) {
			this.currentMedia = undefined;
			this.currentTrack = undefined;
			this.currentEpisode = undefined;
			this.soundPlayer.stop();
			this.setPlaying(false);
		}
	}

	onTrackFinish(): void {
		if (!this.currentMedia) {
			return;
		}
		if (this.repeatTrack) {
			const media = this.currentMedia;
			this.currentMedia = undefined;
			this.play(media);
			return;
		}
		const entry = this.queue.next();
		if (entry) {
			this.play(entry);
		} else {
			this.currentTrack = undefined;
			this.currentEpisode = undefined;
			this.currentMedia = undefined;
			this.currentTime = undefined;
			this.totalTime = undefined;
			this.queue.currentIndex = -1;
			this.setPlaying(false);
			this.publish(PlayerEvents.TRACK, undefined);
			this.syncPlayerWithLocalStorage();
		}
	}

	togglePlayPause(): void {
		if (this.currentMedia !== undefined) {
			if (!this.isPlaying) {
				this.soundPlayer.play();
			} else {
				this.soundPlayer.pause();
			}
		} else {
			const song = this.queue.next();
			if (song) {
				this.play(song);
			}
		}
	}

	next(): void {
		const track = this.queue.next();
		if (track) {
			this.play(track);
		}
	}

	previous(): void {
		const track = this.queue.previous();
		if (track) {
			this.play(track);
		}
	}

	speed(speed: number): void {
		this.soundPlayer.setSpeed(speed);
	}

	seek(time: number): void {
		if (this.currentMedia) {
			this.soundPlayer.seek(time);
			this.syncPlayerWithLocalStorage();
		}
	}

	volume(percent: number): void {
		this.soundPlayer.setVolume(percent);
	}

	forward(seconds: number): void {
		this.seek(this.soundPlayer.position() + (seconds * 1000));
	}

	rewind(seconds: number): void {
		this.seek(Math.max(0, this.soundPlayer.position() - (seconds * 1000)));
	}

	volumeUp(): void {
		const vol = this.soundPlayer.getVolume();
		this.soundPlayer.setVolume(Math.min(vol + 10, 100));
	}

	volumeDown(): void {
		const vol = this.soundPlayer.getVolume();
		this.soundPlayer.setVolume(Math.max(vol - 10, 0));
	}

	mute(): void {
		this.soundPlayer.mute();
	}

	unmute(): void {
		this.soundPlayer.unmute();
	}

	toggleMute(): void {
		if (this.soundPlayer.isMuted()) {
			this.unmute();
		} else {
			this.mute();
		}
	}

	getVolume(): number {
		return this.soundPlayer.getVolume();
	}

	getSpeed(): number {
		return this.soundPlayer.speed();
	}

	on(event: number, handler: any): void {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(handler);
	}

	startTrack(media: Jam.MediaBase): void {
		this.queue.clear();
		this.play(media, true);
	}

	startSeries(series: Jam.Series): void {
		this.queue.clear();
		this.queue.addSeries(series)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startFolder(folder: Jam.Folder): void {
		this.queue.clear();
		this.queue.addFolder(folder)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startPlaylist(playlist: Jam.Playlist): void {
		this.queue.clear();
		this.queue.addPlaylist(playlist)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startAlbum(album: Jam.Album): void {
		this.queue.clear();
		this.queue.addAlbum(album)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startAlbums(albums: Array<Jam.Album>): void {
		this.queue.clear();
		this.queue.addAlbums(albums)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startTracks(tracks: Array<Jam.Track>): void {
		this.queue.clear();
		this.queue.addMedias(tracks);
		this.next();
	}

	startArtists(artists: Array<Jam.Artist>): void {
		this.queue.clear();
		this.queue.addArtists(artists)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});

	}

	startArtist(artist: Jam.Artist): void {
		this.queue.clear();
		this.queue.addArtist(artist)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startPodcast(podcast: Jam.Podcast): void {
		this.queue.clear();
		this.queue.addPodcast(podcast)
			.then(() => {
				this.next();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	startEpisode(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.queue.clear();
			this.play(episode, true);
			this.next();
		}
	}

	startEpisodeSeek(episode: Jam.Episode, seek: number): void {
		if (episode && episode.status === PodcastStatus.completed) {
			if (this.currentMedia && this.currentMedia.id === episode.id) {
				this.seek(seek);
			} else {
				this.queue.clear();
				this.play(episode, true, seek);
			}
		}
	}

	addEpisode(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.resolveAddTracks(this.queue.addEpisode(episode));
		}
	}

	addPodcast(podcast: Jam.Podcast): void {
		this.resolveAddTracks(this.queue.addPodcast(podcast));
	}

	addSeries(series: Jam.Series): void {
		this.resolveAddTracks(this.queue.addSeries(series));
	}

	addFolder(folder: Jam.Folder): void {
		this.resolveAddTracks(this.queue.addFolder(folder));
	}

	addPlaylist(playlist: Jam.Playlist): void {
		this.resolveAddTracks(this.queue.addPlaylist(playlist));
	}

	addAlbum(album: Jam.Album): void {
		this.resolveAddTracks(this.queue.addAlbum(album));
	}

	addArtist(artist: Jam.Artist): void {
		this.resolveAddTracks(this.queue.addArtist(artist));
	}

	addTrack(track: Jam.Track): void {
		this.queue.add(track, true);
		this.resolveAddTracks(Promise.resolve(1));
		// this.notify.success(`Tracks added to queue (${trackCount})`);
	}

	currentPercent(): number {
		return (this.currentTime === undefined || this.totalTime === undefined)
			? 0
			: this.currentTime * 100 / this.totalTime;
	}

	protected resolveAddTracks(promise: Promise<number>): void {
		promise
			.then(trackCount => {
				this.notify.success(`Tracks added to queue: ${trackCount}`);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private startPositionStore(): void {
		this.stopPositionStore();
		this.positionStoreTimer = setInterval(() => {
			this.syncPlayerWithLocalStorage();
		}, 10 * 1000) as any;
	}

	private stopPositionStore(): void {
		clearInterval(this.positionStoreTimer);
	}

	private setPlaying(play: boolean): void {
		if (this.isPlaying === play) {
			return;
		}
		this.isPlaying = play;
		if (play) {
			this.startPositionStore();
			this.scrobbleWatch.start();
		} else {
			this.scrobbleWatch.pause();
			this.stopPositionStore();
		}
		this.syncPlayerWithLocalStorage();
		this.mediasession.setPlaybackState(play, !!this.currentMedia);
	}

	private loadFromStorage(): void {
		this.loadQueueFromStorage();
		const current: { index: number; position: number } | undefined = this.userStorage.get(PlayerService.localPlayerStorageName);
		if (current) {
			this.queue.currentIndex = current.index;
			const track = this.queue.getCurrent();
			if (track) {
				this.play(track, false, current.position, true);
			}
		}
	}

	private loadQueueFromStorage(): void {
		this.queue.set(this.userStorage.get(PlayerService.localQueueStorageName) || []);
	}

	private syncPlayerWithLocalStorage(): void {
		const current = {index: this.queue.currentIndex, position: Math.round(this.soundPlayer.position())};
		this.userStorage.set(PlayerService.localPlayerStorageName, current);
	}

	private syncQueueWithLocalStorage(): void {
		this.userStorage.set(PlayerService.localQueueStorageName, this.queue.entries);
	}

	private subscribeSoundPlayerEvents(): void {
		this.audioSupport = this.soundPlayer.getAudioSupport();

		this.soundPlayer.on(PlayerEvents.PLAY, () => {
			this.publish(PlayerEvents.PLAY, undefined);
			this.setPlaying(true);
		});

		this.soundPlayer.on(PlayerEvents.TRACK, track => {
			this.publish(PlayerEvents.TRACK, track);
		});

		this.soundPlayer.on(PlayerEvents.PLAYSTART, () => {
			this.publish(PlayerEvents.PLAYSTART, undefined);
			this.setPlaying(true);
		});

		this.soundPlayer.on(PlayerEvents.PLAYRESUME, () => {
			this.publish(PlayerEvents.PLAYRESUME, undefined);
			this.setPlaying(true);
		});

		this.soundPlayer.on(PlayerEvents.PAUSE, () => {
			this.publish(PlayerEvents.PAUSE, undefined);
			this.setPlaying(false);
		});

		this.soundPlayer.on(PlayerEvents.FINISH, () => {
			this.publish(PlayerEvents.FINISH, undefined);
			this.onTrackFinish();
		});

		this.soundPlayer.on(PlayerEvents.LOADING, val => {
			this.publish(PlayerEvents.LOADING, val);
		});
		this.soundPlayer.on(PlayerEvents.BUFFERINGSTART, () => {
			this.publish(PlayerEvents.BUFFERINGSTART, undefined);
		});
		this.soundPlayer.on(PlayerEvents.BUFFERINGEND, () => {
			this.publish(PlayerEvents.BUFFERINGEND, undefined);
			this.totalTime = this.soundPlayer.duration();
			this.publish(PlayerEvents.TIME, this.currentTime);
		});
		this.soundPlayer.on(PlayerEvents.SEEK, time => {
			this.publish(PlayerEvents.SEEK, time);
		});
		this.soundPlayer.on(PlayerEvents.SEEKED, () => {
			this.publish(PlayerEvents.SEEKED, undefined);
		});
		this.soundPlayer.on(PlayerEvents.VOLUME, percent => {
			this.publish(PlayerEvents.VOLUME, percent);
		});
		this.soundPlayer.on(PlayerEvents.MUTE, muted => {
			this.isMuted = muted;
			this.publish(PlayerEvents.MUTE, muted);
		});
		this.soundPlayer.on(PlayerEvents.TIME, time => {
			this.currentTime = time;
			this.totalTime = this.soundPlayer.duration();
			if (!this.scrobbled && this.currentMedia?.id) {
				const playTime = this.scrobbleWatch.time();
				const scrobbleTime = Math.min(this.totalTime / 2, 4 * 60 * 60 * 1000);
				if (scrobbleTime > 0 && playTime >= scrobbleTime) {
					this.scrobbled = true;
					this.jam.nowplaying.scrobble({id: this.currentMedia.id})
						.catch(e => {
							console.error(e);
						});
				}
			}
			this.mediasession.updatePositionState(this.totalTime, this.getSpeed(), this.currentTime);
			this.publish(PlayerEvents.TIME, time);
		});
		this.soundPlayer.on(PlayerEvents.SPEED, speed => {
			this.publish(PlayerEvents.SPEED, speed);
		});
		this.soundPlayer.on(PlayerEvents.AUDIOERROR, () => {
			this.publish(PlayerEvents.AUDIOERROR, undefined);
			this.setPlaying(false);
		});
		this.soundPlayer.on(PlayerEvents.NOSTREAM, () => {
			this.publish(PlayerEvents.NOSTREAM, undefined);
		});
	}

	private subscribeMediaSessionEvents(): void {
		this.mediasession.on(MediaSessionEvents.PLAY, () => {
			this.togglePlayPause();
		});
		this.mediasession.on(MediaSessionEvents.PAUSE, () => {
			this.togglePlayPause();
		});
		this.mediasession.on(MediaSessionEvents.NEXT, () => {
			this.next();
		});
		this.mediasession.on(MediaSessionEvents.PREVIOUS, () => {
			this.previous();
		});
		this.mediasession.on(MediaSessionEvents.REWIND, () => {
			this.rewind(5);
		});
		this.mediasession.on(MediaSessionEvents.FORWARD, () => {
			this.forward(5);
		});
		this.mediasession.on(MediaSessionEvents.STOP, () => {
			this.stop();
		});
		this.mediasession.on(MediaSessionEvents.SEEK, (event: { seekTime: number; fastSeek: boolean }) => {
			this.seek(event.seekTime * 1000);
		});
	}

	private publish(event: number, data: any): void {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach(handler => {
				handler(data);
			});
		}
	}

	private setCurrentMedia(media: Jam.MediaBase): void {
		this.mediasession.setMedia(media);
		this.setPushNotification(media);
	}

	private setPushNotification(media: Jam.MediaBase): void {
		if (media) {
			this.notification.show({
				body: media.tag?.artist || '[Unknown Artist]',
				title: media.tag?.title || '[Unknown Title]',
				autoclose: 30,
				icon: this.jam.image.imageUrl({id: media.id, size: 128, format: ImageFormatType.webp})
			})
				.catch(e => {
					console.error(e);
				});
		}
	}

}
