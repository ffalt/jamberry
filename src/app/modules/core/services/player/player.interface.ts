import {Jam} from '@jam';

export class PlayerEvents {
	static readonly TRACK = 1;
	static readonly PLAY = 2;
	static readonly PLAYSTART = 3;
	static readonly PLAYRESUME = 4;
	static readonly PAUSE = 5;
	static readonly FINISH = 6;
	static readonly SEEK = 7;
	static readonly SEEKED = 8;
	static readonly BUFFERINGSTART = 9;
	static readonly BUFFERINGEND = 10;
	static readonly AUDIOERROR = 11;
	static readonly TIME = 12;
	static readonly NOSTREAM = 13;
	static readonly NOPROTOCOL = 14;
	static readonly NOCONNECTION = 15;
	static readonly MUTE = 16;
	static readonly VOLUME = 17;
	static readonly LOADING = 18;
	static readonly SPEED = 19;
}

export interface SoundPlayerAudioSupport {
	formats: Array<string>;
}

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

	on(event: number, handler: (data: any) => void): void;

	preload(track: Jam.Track): void;
}
