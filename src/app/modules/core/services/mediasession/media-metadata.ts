
// Type definitions for Media Session API 1.0
// Project: https://wicg.github.io/mediasession/
// Definitions by: Julien CROUZET <https://github.com/jucrouzet>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

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
	// Media's title.
	title?: string;
	// Media's artist.
	artist?: string;
	// Media's album.
	album?: string;
	// Media's artwork.
	artwork?: Array<MediaImage>;
}

export declare class MediaMetadata {
	// Media's title.
	title: string;
	// Media's artist.
	artist: string;
	// Media's album.
	album: string;
	// Media's artwork.
	artwork: Array<MediaImage>;

	constructor(init?: MediaMetadataInit)
}
