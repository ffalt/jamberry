import {Injectable, NgZone} from '@angular/core';
import {Jam, JamService} from '@jam';

export class MediaSessionEvents {
	static PLAY = 1;
	static PAUSE = 2;
	static REWIND = 3;
	static FORWARD = 4;
	static PREVIOUS = 5;
	static NEXT = 6;
}

// Type definitions for Media Session API 1.0
// Project: https://wicg.github.io/mediasession/
// Definitions by: Julien CROUZET <https://github.com/jucrouzet>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type MediaSessionPlaybackState = 'none' | 'paused' | 'playing';

type MediaSessionAction = 'play' | 'pause' | 'seekbackward' | 'seekforward' | 'previoustrack' | 'nexttrack';

interface MediaSession {
	// Current media session playback state.
	playbackState: MediaSessionPlaybackState;
	// Current media session meta data.
	metadata: MediaMetadata | null;

	// Set/Unset actions handlers.
	setActionHandler(action: MediaSessionAction, listener: (() => void) | null): void;
}

interface MediaImage {
	// URL from which the user agent can fetch the image’s data.
	src: string;
	// Specify the MediaImage object’s sizes. It follows the spec of sizes attribute in HTML link element.
	sizes?: string;
	// A hint as to the media type of the image.
	type?: string;
}

interface MediaMetadataInit {
	// Media's title.
	title?: string;
	// Media's artist.
	artist?: string;
	// Media's album.
	album?: string;
	// Media's artwork.
	artwork?: Array<MediaImage>;
}

declare class MediaMetadata {
	// Media's title.
	title: string;
	// Media's artist.
	artist: string;
	// Media's album.
	album: string;
	// Media's artwork.
	artwork: Array<MediaImage>;

	constructor(init?: MediaMetadataInit);
}

@Injectable({
	providedIn: 'root'
})
export class MediaSessionService {
	private subscribers: {
		[key: number]: Array<any>;
	} = {};
	private mediaSession?: MediaSession;

	constructor(private jam: JamService, private ngZone?: NgZone) {
		if ('mediaSession' in navigator) {
			this.mediaSession = (navigator as any).mediaSession as MediaSession;
		}
		this.initMediaSession();
	}

	setTrack(track: Jam.Track): void {
		if (this.mediaSession) {
			const sizes = [96, 128, 192, 256, 384, 512];
			const artwork = sizes.map(size =>
				({
					src: this.jam.base.image_url(track.id, size, 'png'),
					sizes: `${size}x${size}`,
					type: 'image/png'
				}));
			this.mediaSession.metadata = new MediaMetadata({
				title: track.tag ? track.tag.title : track.name,
				artist: track.tag ? track.tag.artist : undefined,
				album: track.tag ? track.tag.album : undefined,
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
