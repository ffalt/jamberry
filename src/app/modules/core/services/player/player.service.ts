import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {Jam, JamService, PodcastStatus} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotifyService} from '../notify/notify.service';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {QueueService} from '../queue/queue.service';
import {UserStorageService} from '../userstorage/userstorage.service';
import {PlayerEvents, SoundPlayer, SoundPlayerAudioSupport} from './player.interface';
import {PlayerSoundmanager2} from './player.soundmanager2';

@Injectable({
	providedIn: 'root'
})
export class PlayerService implements OnDestroy {
	static localPlayerStorageName = 'player';
	static localQueueStorageName = 'queue';
	currentEpisode: Jam.PodcastEpisode;
	currentTrack: Jam.Track;
	currentTime: number | undefined = undefined;
	totalTime: number | undefined = undefined;
	isMuted: boolean = false;
	audioSupport: SoundPlayerAudioSupport;
	isPlaying = false;
	repeatTrack = false;
	protected unsubscribe = new Subject();
	private subscribers: {
		[key: number]: Array<(data: any) => void>;
	} = {};
	private positionStoreTimer: number;
	private soundPlayer = new PlayerSoundmanager2(this.jam);

	constructor(
		private queue: QueueService,
		private notify: NotifyService,
		private notification: PushNotificationService,
		private userStorage: UserStorageService,
		private jam: JamService,
		private ngZone?: NgZone
	) {
		this.subscribeSoundPlayerEvents(this.soundPlayer);
		this.initMediaSession();
		userStorage.userChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
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

	playQueuePos(index: number): void {
		this.queue.currentIndex = index - 1;
		this.next();
	}

	play(track: Jam.Track, addToQueue = false, startSeek?: number, paused?: boolean): void {
		if (startSeek === undefined && this.isPlaying && this.currentTrack && this.currentTrack.id === track.id) {
			return;
		}
		if (addToQueue) {
			this.queue.add(track);
			this.syncQueueWithLocalStorage();
		}
		this.queue.setIndexByTrack(track);
		this.currentTrack = track;
		this.currentEpisode = undefined;
		this.currentTime = (startSeek || 0);
		if ((track as Jam.PodcastEpisode).podcastID) {
			this.currentEpisode = track as Jam.PodcastEpisode;
		}
		this.soundPlayer.initialize(track, startSeek, paused, e => {
			if (!e) {
				this.setCurrentTrack(track);
				this.setPlaying(!paused);
				this.syncPlayerWithLocalStorage();
			} else {
				this.notify.error(e);
			}
		});
	}

	stop(): void {
		if (this.currentTrack !== undefined) {
			this.currentTrack = undefined;
			this.currentEpisode = undefined;
			this.soundPlayer.stop();
			this.setPlaying(false);
		}
	}

	onTrackFinish(): void {
		if (!this.currentTrack) {
			return;
		}
		if (this.repeatTrack) {
			this.play(this.currentTrack);
			return;
		}
		const track = this.queue.next();
		if (track) {
			this.play(track);
		} else {
			this.currentTrack = undefined;
			this.currentEpisode = undefined;
			this.currentTime = undefined;
			this.totalTime = undefined;
			this.queue.currentIndex = -1;
			this.setPlaying(false);
			this.publish(PlayerEvents.TRACK, undefined);
			this.syncPlayerWithLocalStorage();
		}
	}

	togglePlayPause(): void {
		if (this.currentTrack !== undefined) {
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
		if (this.currentTrack) {
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

	startTrack(track: Jam.Track): void {
		this.queue.clear();
		this.play(track, true);
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
		this.queue.addTracks(tracks);
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

	startEpisode(episode: Jam.PodcastEpisode): void {
		if (episode.status === PodcastStatus.completed) {
			this.queue.clear();
			this.play(episode, true);
			this.next();
		}
	}

	startEpisodeSeek(episode: Jam.PodcastEpisode, seek: number): void {
		if (episode && episode.status === PodcastStatus.completed) {
			if (this.currentTrack && this.currentTrack.id === episode.id) {
				this.seek(seek);
			} else {
				this.queue.clear();
				this.play(episode, true, seek);
			}
		}
	}

	addTrackToQueue(track: Jam.Track): void {
		const trackCount = this.queue.addTracks([track], true);
		this.notify.success(`Tracks added to queue (${trackCount})`);
	}

	addEpisodeToQueue(episode: Jam.PodcastEpisode): void {
		if (episode.status === PodcastStatus.completed) {
			this.queue.addEpisode(episode)
				.then(trackCount => {
					this.notify.success(`Tracks added to queue (${trackCount})`);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	addPodcastToQueue(podcast: Jam.Podcast): void {
		this.queue.addPodcast(podcast)
			.then(trackCount => {
				this.notify.success(`Tracks added to queue (${trackCount})`);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	addFolderToQueue(folder: Jam.Folder): void {
		this.queue.addFolder(folder)
			.then(trackCount => {
				this.notify.success(`Tracks added to queue (${trackCount})`);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	addPlaylistToQueue(playlist: Jam.Playlist): void {
		this.queue.addPlaylist(playlist)
			.then(trackCount => {
				this.notify.success(`Tracks added to queue (${trackCount})`);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	addAlbumToQueue(album: Jam.Album): void {
		this.queue.addAlbum(album)
			.then(trackCount => {
				this.notify.success(`Tracks added to queue (${trackCount})`);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	addArtistToQueue(artist: Jam.Artist): void {
		this.queue.addArtist(artist)
			.then(trackCount => {
				this.notify.success(`Tracks added to queue (${trackCount})`);
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
		} else {
			this.stopPositionStore();
		}
		this.syncPlayerWithLocalStorage();
		if ('mediaSession' in navigator) {
			navigator.mediaSession.playbackState = play ? 'playing' : (this.currentTrack ? 'paused' : 'none');
		}
	}

	private loadFromStorage(): void {
		this.loadQueueFromStorage();
		const current: { index: number, position: number } = this.userStorage.get(PlayerService.localPlayerStorageName);
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
		this.userStorage.set(PlayerService.localQueueStorageName, this.queue.tracks);
	}

	private subscribeSoundPlayerEvents(soundPlayer: SoundPlayer): void {
		this.audioSupport = this.soundPlayer.getAudioSupport();

		soundPlayer.on(PlayerEvents.PLAY, () => {
			this.publish(PlayerEvents.PLAY, undefined);
			this.setPlaying(true);
		});

		soundPlayer.on(PlayerEvents.TRACK, track => {
			this.publish(PlayerEvents.TRACK, track);
		});

		soundPlayer.on(PlayerEvents.PLAYSTART, () => {
			this.publish(PlayerEvents.PLAYSTART, undefined);
			this.setPlaying(true);
		});

		soundPlayer.on(PlayerEvents.PLAYRESUME, () => {
			this.publish(PlayerEvents.PLAYRESUME, undefined);
			this.setPlaying(true);
		});

		soundPlayer.on(PlayerEvents.PAUSE, () => {
			this.publish(PlayerEvents.PAUSE, undefined);
			this.setPlaying(false);
		});

		soundPlayer.on(PlayerEvents.FINISH, () => {
			this.publish(PlayerEvents.FINISH, undefined);
			this.onTrackFinish();
		});

		soundPlayer.on(PlayerEvents.LOADING, val => {
			this.publish(PlayerEvents.LOADING, val);
		});
		soundPlayer.on(PlayerEvents.BUFFERINGSTART, () => {
			this.publish(PlayerEvents.BUFFERINGSTART, undefined);
		});
		soundPlayer.on(PlayerEvents.BUFFERINGEND, () => {
			this.publish(PlayerEvents.BUFFERINGEND, undefined);
			this.totalTime = this.soundPlayer.duration();
			this.publish(PlayerEvents.TIME, this.currentTime);
		});
		soundPlayer.on(PlayerEvents.SEEK, time => {
			this.publish(PlayerEvents.SEEK, time);
		});
		soundPlayer.on(PlayerEvents.SEEKED, () => {
			this.publish(PlayerEvents.SEEKED, undefined);
		});
		soundPlayer.on(PlayerEvents.VOLUME, percent => {
			this.publish(PlayerEvents.VOLUME, percent);
		});
		soundPlayer.on(PlayerEvents.MUTE, muted => {
			this.isMuted = muted;
			this.publish(PlayerEvents.MUTE, muted);
		});
		soundPlayer.on(PlayerEvents.TIME, time => {
			// const rest = this.soundPlayer.duration() - time;
			// if (rest < 30000) {
			// 	const next = this.queue.getNext();
			// 	if (next) {
			// 		this.soundPlayer.preload(next);
			// 	}
			// }
			this.currentTime = time;
			this.totalTime = this.soundPlayer.duration();
			this.publish(PlayerEvents.TIME, time);
		});
		soundPlayer.on(PlayerEvents.SPEED, speed => {
			this.publish(PlayerEvents.SPEED, speed);
		});
		soundPlayer.on(PlayerEvents.AUDIOERROR, () => {
			this.publish(PlayerEvents.AUDIOERROR, undefined);
			this.setPlaying(false);
		});
		soundPlayer.on(PlayerEvents.NOSTREAM, () => {
			this.publish(PlayerEvents.NOSTREAM, undefined);
		});
	}

	private publish(event: number, data: any): void {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach(handler => {
				handler(data);
			});
		}
	}

	private setCurrentTrack(track: Jam.Track): void {
		this.setMediaSession(track);
		this.setPushNotification(track);
	}

	private setPushNotification(track: Jam.Track): void {
		if (track) {
			this.notification.show({
				body: track.tag.artist,
				title: track.tag.title,
				autoclose: 30,
				icon: this.jam.base.image_url(track.id, 128)
			})
				.catch(e => {
					console.error(e);
				});
		}
	}

	private setMediaSession(track: Jam.Track): void {
		if ('mediaSession' in navigator) {
			const mediaSession = navigator.mediaSession;
			const sizes = [96, 128, 192, 256, 384, 512];
			const artwork = sizes.map(size =>
				({
					src: this.jam.base.image_url(track.id, size, 'png'),
					sizes: `${size}x${size}`,
					type: 'image/png'
				}));
			mediaSession.metadata = new MediaMetadata({
				title: track.tag ? track.tag.title : track.name,
				artist: track.tag ? track.tag.artist : undefined,
				album: track.tag ? track.tag.album : undefined,
				artwork
			});
		}
	}

	private initMediaSession(): void {
		if ('mediaSession' in navigator) {
			const mediaSession = navigator.mediaSession;
			mediaSession.setActionHandler('play', () => {
				this.ngZone.run(() => {
					this.togglePlayPause();
				});
			});
			mediaSession.setActionHandler('pause', () => {
				this.ngZone.run(() => {
					this.togglePlayPause();
				});
			});
			mediaSession.setActionHandler('seekbackward', () => {
				this.ngZone.run(() => {
					this.rewind(5);
				});
			});
			mediaSession.setActionHandler('seekforward', () => {
				this.ngZone.run(() => {
					this.forward(5);
				});
			});
			mediaSession.setActionHandler('previoustrack', () => {
				this.ngZone.run(() => {
					this.previous();
				});
			});
			mediaSession.setActionHandler('nexttrack', () => {
				this.ngZone.run(() => {
					this.next();
				});
			});
		}

	}

}
