import {Injectable, NgZone} from '@angular/core';
import {ImageFormatType, Jam, JamService} from '@jam';
import {MediaSessionEvents} from './mediasession.events';

export type MediaSessionPlaybackState = 'none' | 'paused' | 'playing';

export type MediaSessionAction = 'play' | 'pause' | 'seekbackward' | 'seekforward' | 'previoustrack' | 'nexttrack';

export interface MediaSession {
	// Current media session playback state.
	playbackState: MediaSessionPlaybackState;
	// Current media session meta data.
	metadata: MediaMetadata | null;

	// Set/Unset actions handlers.
	setActionHandler(action: MediaSessionAction, listener: (() => void) | null): void;
}

export interface MediaImage {
	// URL from which the user agent can fetch the image’s data.
	src: string;
	// Specify the MediaImage object’s sizes. It follows the spec of sizes attribute in HTML link element.
	sizes?: string;
	// A hint as to the media type of the image.
	type?: string;
}

export interface MediaMetadataInit {
	title?: string;
	artist?: string;
	album?: string;
	artwork?: Array<MediaImage>;
}

export declare class MediaMetadata {
	// Media's title.
	title?: string;
	// Media's artist.
	artist?: string;
	// Media's album.
	album?: string;
	// Media's artwork.
	artwork?: Array<MediaImage>;

	constructor(options: MediaMetadataInit);
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
			this.mediaSession.metadata = new MediaMetadata({
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
