import type { Jam, JamService } from '@jam';
import { type SMSound, soundManager } from 'soundmanager2';
import { PlayerEvents, type SoundPlayer, type SoundPlayerAudioSupport } from './player.interface';

soundManager.debugMode = false;
soundManager.forceUseGlobalHTML5Audio = true;
soundManager.useHTML5Audio = true;
soundManager.preferFlash = false;

export class PlayerSoundmanager2 implements SoundPlayer {
	private soundObject?: SMSound;
	private subscribers: { [key: number]: Array<((data?: any) => void)> | undefined } = {};
	private lastMedia?: Jam.MediaBase;
	private volume: number = 50;
	private isMute: boolean = false;
	private lastTimeUpdate = 0;

	constructor(private readonly jam: JamService) {
	}

	duration(): number {
		return this.soundObject ? (this.soundObject.duration ?? 0) : 0;
	}

	getAudioSupport(): SoundPlayerAudioSupport {
		const result: SoundPlayerAudioSupport = {
			formats: Object.keys(soundManager.audioFormats ?? {})
		};
		result.formats.sort((a, b) => a.localeCompare(b));
		return result;
	}

	getVolume(): number {
		if (!this.soundObject || this.isMute) {
			return this.volume;
		}
		return this.soundObject.volume;
	}

	buildSoundObject(media: Jam.MediaBase, position: number | undefined): SMSound | undefined {
		return soundManager.createSound({
			url: this.jam.stream.streamUrl({ id: media.id }),
			id: media.id,
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
			onload: (success: boolean) => {
				this.publish(PlayerEvents.BUFFERINGEND, success);
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
				const now = Date.now();
				if (now - this.lastTimeUpdate > 500) {
					this.lastTimeUpdate = now;
					const time = this.position();
					this.publish(PlayerEvents.TIME, time);
				}
			}
		});
	}

	initialize(track: Jam.MediaBase, startSeek: number | undefined, paused: boolean, callback: (e?: Error) => void): void {
		if (this.lastMedia?.id !== track.id) {
			this.unloadLast();
		}
		let soundObject = soundManager.getSoundById(track.id);
		if (!soundObject) {
			soundObject = this.buildSoundObject(track, startSeek);
			if (!soundObject) {
				callback(new Error('Soundplayer could not be initialized.'));
				return;
			}
			this.lastMedia = track;
		} else if (startSeek !== undefined) {
			soundObject.setPosition(startSeek);
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
		const list = this.subscribers[event] ?? [];
		list.push(handler);
		this.subscribers[event] = list;
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

	preload(): void {
		// nope?
	}

	seek(time: number): void {
		if (this.soundObject) {
			this.soundObject.setPosition(time);
		}
	}

	setSpeed(speed: number): void {
		if (this.soundObject) {
			this.soundObject.setPlaybackRate(speed);
			this.publish(PlayerEvents.SPEED, this.speed());
		}
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
			return this.soundObject._iO.playbackRate;
		}
		return 1;
	}

	stop(): void {
		if (this.soundObject) {
			this.soundObject.stop();
			this.unloadLast();
			this.lastMedia = undefined;
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
		return this.soundObject ? (this.soundObject.bytesLoaded ?? 0) : 0;
	}

	private publish(event: number, data?: any): void {
		const list = this.subscribers[event];
		if (list) {
			for (const handler of list) {
				handler(data);
			}
		}
	}

	private unloadLast(): void {
		if (this.lastMedia) {
			soundManager.unload(this.lastMedia.id);
			soundManager.destroySound(this.lastMedia.id);
			this.lastMedia = undefined;
		}
	}
}
