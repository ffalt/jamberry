import { inject, Injectable, type OnDestroy } from '@angular/core';
import { MediaSessionEvents } from '../mediasession/mediasession.events';
import { MediaSessionService } from '../mediasession/mediasession.service';
import { ImageFormatType, type Jam, JamObjectType, JamService, PodcastStatus } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { StopWatch } from '@utils/stopwatch';
import { NotifyService } from '../notify/notify.service';
import { PushNotificationService } from '../push-notification/push-notification.service';
import { QueueService } from '../queue/queue.service';
import { UserStorageService } from '../userstorage/userstorage.service';
import { type PlayerEventHandler, type PlayerEventMap, PlayerEvents, type PlayerSubscriberStore, type SoundPlayerAudioSupport } from './player.interface';
import { PlayerSoundmanager2 } from './player.soundmanager2';

@Injectable({
	providedIn: 'root'
})
export class PlayerService implements OnDestroy {
	static readonly localPlayerStorageName = 'player';
	static readonly localQueueStorageName = 'queue';
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
	currentNotification?: Notification;
	private readonly soundPlayer: PlayerSoundmanager2;
	private readonly unsubscribe = new Subject<void>();
	private readonly queue = inject(QueueService);
	private readonly notify = inject(NotifyService);
	private readonly notification = inject(PushNotificationService);
	private readonly mediasession = inject(MediaSessionService);
	private readonly userStorage = inject(UserStorageService);
	private readonly jam = inject(JamService);
	private subscribers: PlayerSubscriberStore = {};
	private positionStoreTimer?: ReturnType<typeof setInterval>;

	constructor() {
		const userStorage = this.userStorage;
		const jam = this.jam;

		this.soundPlayer = new PlayerSoundmanager2(jam);
		this.subscribeSoundPlayerEvents();
		this.subscribeMediaSessionEvents();
		userStorage.userChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((/* user */) => {
				this.loadFromStorage();
			});
		this.loadFromStorage();
		this.queue.queueChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.syncQueueWithLocalStorage();
			});
	}

	get empty(): Readonly<boolean> {
		return !(this.currentTrack ?? this.currentEpisode);
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	playQueuePos(index: number): void {
		this.queue.currentIndex = index - 1;
		this.next();
	}

	play(media: Jam.MediaBase, addToQueue = false, startSeek?: number, paused?: boolean): void {
		if (startSeek === undefined && this.isPlaying && this.currentMedia?.id === media.id) {
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
		this.currentTime = (startSeek ?? 0);
		this.scrobbleWatch.reset();
		if (media.objType === JamObjectType.episode) {
			this.currentEpisode = media as Jam.Episode;
		} else {
			this.currentTrack = media as Jam.Track;
		}
		this.soundPlayer.initialize(media, startSeek, !!paused, error => {
			if (this.currentMedia?.id !== media.id) {
				return;
			}
			if (error) {
				this.notify.error(error);
			} else {
				this.setCurrentMedia(media);
				this.setPlaying(!paused);
				this.syncPlayerWithLocalStorage();
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
		const media = this.currentMedia;
		this.currentMedia = undefined; // Clear current media to break potential loops if play fails
		if (this.repeatTrack) {
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
		if (this.currentMedia === undefined) {
			const song = this.queue.next();
			if (song) {
				this.play(song);
			}
		} else if (this.isPlaying) {
			this.soundPlayer.pause();
		} else {
			this.soundPlayer.play();
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

	on<E extends PlayerEvents>(event: E, handler: PlayerEventHandler<E>): void {
		const list = this.subscribers[event] as Array<PlayerEventHandler<E>> | undefined;
		if (list) {
			list.push(handler);
		} else {
			this.subscribers[event] = [handler] as PlayerSubscriberStore[E];
		}
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
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startFolder(folder: Jam.Folder): void {
		this.queue.clear();
		this.queue.addFolder(folder)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startPlaylist(playlist: Jam.Playlist): void {
		this.queue.clear();
		this.queue.addPlaylist(playlist)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startAlbum(album: Jam.Album): void {
		this.queue.clear();
		this.queue.addAlbum(album)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startAlbums(albums: Array<Jam.Album>): void {
		this.queue.clear();
		this.queue.addAlbums(albums)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
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
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startArtist(artist: Jam.Artist): void {
		this.queue.clear();
		this.queue.addArtist(artist)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startPodcast(podcast: Jam.Podcast): void {
		this.queue.clear();
		this.queue.addPodcast(podcast)
			.then(() => {
				this.next();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	startEpisode(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.queue.clear();
			this.play(episode, true);
		}
	}

	startEpisodeSeek(episode: Jam.Episode, seek: number): void {
		if (episode.status === PodcastStatus.completed) {
			if (this.currentMedia?.id === episode.id) {
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
	}

	currentPercent(): number {
		return (this.currentTime === undefined || this.totalTime === undefined) ?
			0 :
			this.currentTime * 100 / this.totalTime;
	}

	protected resolveAddTracks(promise: Promise<number>): void {
		promise
			.then(trackCount => {
				this.notify.success(`Tracks added to queue: ${trackCount}`);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	private startPositionStore(): void {
		this.stopPositionStore();
		this.positionStoreTimer = setInterval(() => {
			this.syncPlayerWithLocalStorage();
		}, 10 * 1000);
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
		this.queue.set(this.userStorage.get(PlayerService.localQueueStorageName) ?? []);
	}

	private syncPlayerWithLocalStorage(): void {
		const current = { index: this.queue.currentIndex, position: Math.round(this.soundPlayer.position()) };
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

		this.soundPlayer.on(PlayerEvents.TRACK, (track: Jam.Track) => {
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

		this.soundPlayer.on(PlayerEvents.LOADING, (value: number) => {
			this.publish(PlayerEvents.LOADING, value);
		});
		this.soundPlayer.on(PlayerEvents.BUFFERINGSTART, () => {
			this.publish(PlayerEvents.BUFFERINGSTART, undefined);
		});
		this.soundPlayer.on(PlayerEvents.BUFFERINGEND, () => {
			this.publish(PlayerEvents.BUFFERINGEND, undefined);
			this.totalTime = this.soundPlayer.duration();
			this.publish(PlayerEvents.TIME, this.currentTime ?? 0);
		});
		this.soundPlayer.on(PlayerEvents.SEEK, (time: number) => {
			this.publish(PlayerEvents.SEEK, time);
		});
		this.soundPlayer.on(PlayerEvents.SEEKED, () => {
			this.publish(PlayerEvents.SEEKED, undefined);
		});
		this.soundPlayer.on(PlayerEvents.VOLUME, (percent: number) => {
			this.publish(PlayerEvents.VOLUME, percent);
		});
		this.soundPlayer.on(PlayerEvents.MUTE, (muted: boolean) => {
			this.isMuted = muted;
			this.publish(PlayerEvents.MUTE, muted);
		});
		this.soundPlayer.on(PlayerEvents.TIME, (time: number) => {
			this.currentTime = time;
			this.totalTime = this.soundPlayer.duration();
			if (!this.scrobbled && this.currentMedia?.id) {
				const playTime = this.scrobbleWatch.time();
				const scrobbleTime = Math.min(this.totalTime / 2, 4 * 60 * 60 * 1000);
				if (scrobbleTime > 0 && playTime >= scrobbleTime) {
					this.scrobbled = true;
					this.jam.nowplaying.scrobble({ id: this.currentMedia.id }).catch((error: unknown) => {
						console.error(error);
					});
				}
			}
			this.mediasession.updatePositionState(this.totalTime, this.getSpeed(), this.currentTime);
			this.publish(PlayerEvents.TIME, time);
		});
		this.soundPlayer.on(PlayerEvents.SPEED, (speed: number) => {
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

	private publish<E extends PlayerEvents>(event: E, data: PlayerEventMap[E]): void {
		const handlers = this.subscribers[event] as Array<PlayerEventHandler<E>> | undefined;
		if (!handlers) {
			return;
		}
		for (const h of handlers) {
			// Safe call: for no-payload events, `h` is () => void; passing an argument is fine at runtime,
			// and the cast keeps TypeScript happy without `any`.
			(h as (arg: PlayerEventMap[E]) => void)(data);
		}
	}

	private setCurrentMedia(media: Jam.MediaBase): void {
		this.mediasession.setMedia(media);
		this.setPushNotification(media);
	}

	private closePushNotification(): void {
		if (this.currentNotification) {
			this.notification.close(this.currentNotification);
			this.currentNotification = undefined;
		}
	}

	private setPushNotification(media?: Jam.MediaBase): void {
		this.closePushNotification();
		if (media) {
			this.notification.show({
				body: media.tag?.artist ?? '[Unknown Artist]',
				title: media.tag?.title ?? '[Unknown Title]',
				icon: this.jam.image.imageUrl({ id: media.id, size: 128, format: ImageFormatType.webp })
			})
				.then(notification => {
					this.currentNotification = notification;
				})
				.catch((error: unknown) => {
					console.error(error);
				});
		}
	}
}
