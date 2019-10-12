import {Jam, JamService} from '@jam';
import soundmanager2 from 'soundmanager2';
import {PlayerEvents, SoundPlayer, SoundPlayerAudioSupport} from './player.interface';

declare const soundManager: soundmanager2.SoundManager;

/**
 * This class take responsibility to play audio. Just it.
 */
export class PlayerSoundmanager2 implements SoundPlayer {
	private soundObject: soundmanager2.SMSound;
	private subscribers: {
		[key: number]: Array<any>;
	} = {};
	private lastTrack: Jam.Track;
	private volume: number = 50;
	private isMute: boolean = false;

	constructor(private jam: JamService) {
		soundManager.debugMode = false;
		soundManager.forceUseGlobalHTML5Audio = true;
		soundManager.useHTML5Audio = true;
		soundManager.preferFlash = false;
	}

	duration(): number {
		return this.soundObject ? (this.soundObject.duration || 0) : 0;
	}

	getAudioSupport(): SoundPlayerAudioSupport {
		const result: SoundPlayerAudioSupport = {
			formats: Object.keys(soundManager.audioFormats)
		};
		result.formats.sort();
		return result;
	}

	getVolume(): number {
		if (!this.soundObject || this.isMute) {
			return this.volume;
		}
		return this.soundObject.volume;
	}

	buildSoundObject(track: Jam.Track, position: number | undefined): soundmanager2.SMSound {
		return soundManager.createSound({
			url: this.jam.media.stream_url(track.id),
			id: track.id,
			volume: this.isMute ? 0 : this.volume,
			autoLoad: true,
			autoPlay: false,
			position,
			onbufferchange: () => {
				this.publish(PlayerEvents.BUFFERINGSTART);
			},
			ondataerror: () => {
				this.publish(PlayerEvents.AUDIOERROR);
			},
			whileloading: () => {
				this.publish(PlayerEvents.LOADING, this.getLoading());
			},
			onfinish: () => {
				this.publish(PlayerEvents.FINISH);
			},
			onload: (ready: boolean) => {
				this.publish(PlayerEvents.BUFFERINGEND, ready);
			},
			onpause: () => {
				this.publish(PlayerEvents.PAUSE);
			},
			onplay: () => {
				this.publish(PlayerEvents.PLAY);
			},
			onresume: () => {
				this.publish(PlayerEvents.PLAYRESUME);
			},
			onstop: () => {
				this.publish(PlayerEvents.FINISH);
			},
			whileplaying: () => {
				const time = this.position();
				this.publish(PlayerEvents.TIME, time);
			}
		});
	}

	initialize(track: Jam.Track, startSeek: number | undefined, paused: boolean, callback: (e?: Error) => void): void {
		this.unloadLast();
		let soundObject = soundManager.getSoundById(track.id);
		if (!soundObject) {
			soundObject = this.buildSoundObject(track, startSeek);
			if (!soundObject) {
				callback(new Error('Error while create sound'));
				return;
			}
			this.lastTrack = track;
		}
		if (!paused) {
			soundObject.play();
		}
		this.soundObject = soundObject;
		this.publish(PlayerEvents.TRACK, track);
		this.publish(PlayerEvents.SPEED, this.speed());
		this.publish(PlayerEvents.VOLUME, this.getVolume());
		callback();
	}

	isMuted(): boolean {
		return this.isMute;
	}

	mute(): void {
		this.isMute = true;
		if (this.soundObject) {
			this.soundObject.setVolume(0);
		}
		this.publish(PlayerEvents.MUTE, true);
	}

	on(event: number, handler: (data: any) => void): void {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(handler);
	}

	pause(): void {
		if (this.soundObject) {
			this.soundObject.pause();
		}
	}

	play(): void {
		if (this.soundObject) {
			if (this.soundObject.playState === 0) {
				this.soundObject.play();
			} else {
				this.soundObject.resume();
			}
		}
	}

	position(): number {
		return this.soundObject ? (this.soundObject.position || 0) : 0;
	}

	preload(track: Jam.Track): void {
		// nope?
	}

	seek(time: number): void {
		if (this.soundObject) {
			this.soundObject.setPosition(time);
		}
	}

	setSpeed(speed: number): void {
		this.soundObject.setPlaybackRate(speed);
		this.publish(PlayerEvents.SPEED, this.speed());
	}

	setVolume(value: number): void {
		this.volume = value;
		if (this.soundObject) {
			this.soundObject.setVolume(value);
		}
		this.publish(PlayerEvents.VOLUME, this.getVolume());
	}

	speed(): number {
		if (this.soundObject) {
			// TODO: is there no api for getting internal playbackRate?
			return this.soundObject._iO.playbackRate;
		}
		return 1;
	}

	stop(): void {
		if (this.soundObject) {
			this.soundObject.stop();
			this.unloadLast();
			this.lastTrack = undefined;
		}
	}

	unmute(): void {
		this.isMute = false;
		if (this.soundObject) {
			this.soundObject.setVolume(this.volume);
		}
		this.publish(PlayerEvents.MUTE, false);
	}

	private getLoading(): number {
		return this.soundObject ? (this.soundObject.bytesLoaded || 0) : 0;
	}

	private publish(event: number, data?: any): void {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach(handler => {
				handler(data);
			});
		}
	}

	private unloadLast(): void {
		if (this.lastTrack) {
			soundManager.unload(this.lastTrack.id);
			soundManager.destroySound(this.lastTrack.id);
			this.lastTrack = undefined;
		}
	}

}
