import {Injectable, NgZone} from '@angular/core';
import {ImageFormatType, Jam, JamService} from '@jam';
import {MediaImage, MediaMetadata, MediaSession} from './media-metadata';
import {MediaSessionEvents} from './mediasession.events';

export declare class MediaMetadataObj implements MediaMetadata {
	// Media's title.
	title: string;
	// Media's artist.
	artist: string;
	// Media's album.
	album: string;
	// Media's artwork.
	artwork: Array<MediaImage>;

	constructor(init?: MediaMetadata)
}

@Injectable({
	providedIn: 'root'
})
export class MediaSessionService {
	private subscribers: {
		[key: number]: Array<any>;
	} = {};
	private readonly mediaSession?: MediaSession;

	constructor(private jam: JamService, private ngZone: NgZone) {
		if ('mediaSession' in navigator) {
			this.mediaSession = (navigator as any).mediaSession as MediaSession;
		}
		this.initMediaSession();
	}

	setMedia(media: Jam.MediaBase): void {
		if (this.mediaSession) {
			const sizes = [96, 128, 192, 256, 384, 512];
			const artwork = sizes.map(size =>
				({
					src: this.jam.image.imageUrl({id: media.id, size, format: ImageFormatType.png}),
					sizes: `${size}x${size}`,
					type: 'image/png'
				}));
			this.mediaSession.metadata = new MediaMetadataObj({
				title: media.tag ? media.tag.title : media.name,
				artist: media.tag ? media.tag.artist : undefined,
				album: media.tag ? media.tag.album : undefined,
				artwork
			});
		}
	}

	setPlaybackState(playing: boolean, paused: boolean): void {
		if (this.mediaSession) {
			this.mediaSession.playbackState = playing ? 'playing' : (paused ? 'paused' : 'none');
		}
	}

	on(event: number, handler: (data: any) => void): void {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(handler);
	}

	private publish(event: number, data?: any): void {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach(handler => {
				handler(data);
			});
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
