import type { Jam } from '@jam';

export enum PlayerEvents {
	TRACK = 1,
	PLAY = 2,
	PLAYSTART = 3,
	PLAYRESUME = 4,
	PAUSE = 5,
	FINISH = 6,
	SEEK = 7,
	SEEKED = 8,
	BUFFERINGSTART = 9,
	BUFFERINGEND = 10,
	AUDIOERROR = 11,
	TIME = 12,
	NOSTREAM = 13,
	NOPROTOCOL = 14,
	NOCONNECTION = 15,
	MUTE = 16,
	VOLUME = 17,
	LOADING = 18,
	SPEED = 19
}

export interface PlayerEventMap {
	[PlayerEvents.TRACK]: Jam.Track | undefined;
	[PlayerEvents.PLAY]: undefined;
	[PlayerEvents.PLAYSTART]: undefined;
	[PlayerEvents.PLAYRESUME]: undefined;
	[PlayerEvents.PAUSE]: undefined;
	[PlayerEvents.FINISH]: undefined;
	[PlayerEvents.SEEK]: number; // time
	[PlayerEvents.SEEKED]: undefined;
	[PlayerEvents.BUFFERINGSTART]: undefined;
	[PlayerEvents.BUFFERINGEND]: undefined;
	[PlayerEvents.AUDIOERROR]: undefined;
	[PlayerEvents.TIME]: number; // current time
	[PlayerEvents.NOSTREAM]: undefined;
	[PlayerEvents.NOPROTOCOL]: undefined;
	[PlayerEvents.NOCONNECTION]: undefined;
	[PlayerEvents.MUTE]: boolean; // isMuted
	[PlayerEvents.VOLUME]: number; // volume percent or 0..1
	[PlayerEvents.LOADING]: number | boolean; // loading progress 0..100
	[PlayerEvents.SPEED]: number; // playback rate
}

export type PlayerEventHandler<E extends PlayerEvents> =
	PlayerEventMap[E] extends undefined ? () => void : (data: PlayerEventMap[E]) => void;

export interface SoundPlayerAudioSupport {
	formats: Array<string>;
}

export type PlayerSubscriberStore = { [K in PlayerEvents]?: Array<PlayerEventHandler<K>> };

export interface SoundPlayer {
	initialize(track: Jam.Track, startSeek: number | undefined, paused: boolean, callback: (e?: Error) => void): void;

	getAudioSupport(): SoundPlayerAudioSupport;

	play(): void;

	pause(): void;

	stop(): void;

	mute(): void;

	unmute(): void;

	isMuted(): boolean;

	setSpeed(speed: number): void;

	speed(): number;

	seek(time: number): void;

	position(): number;

	duration(): number;

	getVolume(): number;

	setVolume(value: number): void;

	on<E extends PlayerEvents>(event: E, handler: PlayerEventHandler<E>): void;

	preload(track: Jam.Track): void;
}
