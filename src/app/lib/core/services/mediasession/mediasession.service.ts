import { inject, Injectable, NgZone } from '@angular/core';
import { ImageFormatType, type Jam, JamService } from '@jam';
import { MediaSessionEvents } from './mediasession.events';

@Injectable({
	providedIn: 'root'
})
export class MediaSessionService {
	private readonly jam = inject(JamService);
	private readonly ngZone = inject(NgZone);
	private readonly mediaSession?: MediaSession;
	private subscribers: { [key: number]: Array<(data: any) => void> | undefined } = {};

	constructor() {
		this.mediaSession = navigator.mediaSession;
		this.initMediaSession();
	}

	setMedia(media: Jam.MediaBase): void {
		if (this.mediaSession) {
			const sizes = [96, 128, 192, 256, 384, 512];
			const artwork = sizes.map(size =>
				({
					src: this.jam.image.imageUrl({ id: media.id, size, format: ImageFormatType.png }),
					sizes: `${size}x${size}`,
					type: 'image/png'
				}));
			const state = {
				title: media.tag ? media.tag.title : media.name,
				artist: media.tag ? media.tag.artist : undefined,
				album: media.tag ? media.tag.album : undefined,
				artwork
			};
			this.mediaSession.metadata = new MediaMetadata(state);
		}
	}

	updatePositionState = (duration?: number, playbackRate?: number, position?: number) => {
		if (this.mediaSession && 'setPositionState' in this.mediaSession) {
			const d = (duration ?? 0) / 1000;
			const state = {
				duration: d,
				playbackRate: playbackRate ?? 1,
				position: Math.min(d, (position ?? 0) / 1000)
			};
			try {
				this.mediaSession.setPositionState(state);
			} catch (error) {
				console.error(error);
			}
		}
	};

	setPlaybackState(playing: boolean, paused: boolean): void {
		if (this.mediaSession) {
			let playbackState: MediaSessionPlaybackState = 'none';
			if (playing) {
				playbackState = 'playing';
			} else if (paused) {
				playbackState = 'paused';
			}
			this.mediaSession.playbackState = playbackState;
		}
	}

	on(event: number, handler: (data: any) => void): void {
		const list = this.subscribers[event] ?? [];
		list.push(handler);
		this.subscribers[event] = list;
	}

	private publish(event: number, data?: any): void {
		const list = this.subscribers[event];
		if (list) {
			for (const handler of list) {
				handler(data);
			}
		}
	}

	private initMediaSession(): void {
		if (this.mediaSession) {
			this.mediaSession.setActionHandler('play', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.PLAY);
				});
			});
			this.mediaSession.setActionHandler('pause', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.PAUSE);
				});
			});
			this.mediaSession.setActionHandler('seekbackward', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.REWIND);
				});
			});
			this.mediaSession.setActionHandler('seekforward', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.FORWARD);
				});
			});
			try {
				this.mediaSession.setActionHandler('stop', () => {
					/* Stop (supported since Chrome 77) */
					this.ngZone.run(() => {
						this.publish(MediaSessionEvents.STOP);
					});
				});
			} catch {
				console.warn('Warning! The "stop" media session action is not supported.');
			}
			try {
				this.mediaSession.setActionHandler('seekto', event => {
					/* Seek To (supported since Chrome 78) */
					this.ngZone.run(() => {
						this.publish(MediaSessionEvents.SEEK, { fastSeek: event.fastSeek, seekTime: event.seekTime });
					});
				});
			} catch {
				console.warn('Warning! The "seekto" media session action is not supported.');
			}
			this.mediaSession.setActionHandler('previoustrack', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.PREVIOUS);
				});
			});
			this.mediaSession.setActionHandler('nexttrack', () => {
				this.ngZone.run(() => {
					this.publish(MediaSessionEvents.NEXT);
				});
			});
		}
	}
}
