import {Jam} from '@jam';

export class PlayerEvents {
	static TRACK = 1;
	static PLAY = 2;
	static PLAYSTART = 3;
	static PLAYRESUME = 4;
	static PAUSE = 5;
	static FINISH = 6;
	static SEEK = 7;
	static SEEKED = 8;
	static BUFFERINGSTART = 9;
	static BUFFERINGEND = 10;
	static AUDIOERROR = 11;
	static TIME = 12;
	static NOSTREAM = 13;
	static NOPROTOCOL = 14;
	static NOCONNECTION = 15;
	static MUTE = 16;
	static VOLUME = 17;
	static LOADING = 18;
	static SPEED = 19;
}

export interface SoundPlayerAudioSupport {
	formats: Array<string>;
}

export interface SoundPlayer {
	initialize(track: Jam.Track, startSeek: number | undefined, paused: boolean, callback: (e: Error) => void): void;

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
