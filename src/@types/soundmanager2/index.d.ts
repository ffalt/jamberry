/* eslint-disable max-classes-per-file */
// Type definitions for soundmanager2 2.97
// Project: https://github.com/scottschiller/SoundManager2, http://www.schillmania.com/projects/soundmanager2
// Definitions by: Elton Lee <https://github.com/elton2048>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
declare module 'soundmanager2' {
	// soundManager: soundmanager.SoundManager;

	// namespace soundmanager {
	type ScriptAccess = 'always' | 'sameDomain';

	export interface DefaultOptions {
		autoLoad?: boolean;
		autoPlay?: boolean;
		from?: number | null;
		loops?: number;
		onid3?: (() => void) | null;
		onerror?: (() => void) | null;
		onload?: ((success: boolean) => void) | null;
		onbufferchange?: (() => void) | null;
		ondataerror?: (() => void) | null;
		whileloading?: (() => void) | null;
		onplay?: (() => void) | null;
		onpause?: (() => void) | null;
		onresume?: (() => void) | null;
		whileplaying?: (() => void) | null;
		onposition?: (() => void) | null;
		onstop?: (() => void) | null;
		onfinish?: (() => void) | null;
		multiShot?: boolean;
		multiShotEvents?: boolean;
		position?: number | null;
		pan?: number;
		playbackRate?: number;
		stream?: boolean;
		to?: number | null;
		type?: string | null;
		usePolicyFile?: boolean;
		volume?: number;
	}

	export interface Flash9Options {
		onfailure?: (() => void) | null;
		isMovieStar?: true | null;
		usePeakData?: boolean;
		useWaveformData?: boolean;
		useEQData?: boolean;
		onbufferchange?: (() => void) | null;
		ondataerror?: (() => void) | null;
	}

	export interface MovieStarOptions {
		bufferTime?: number;
		serverURL?: string | null;
		onconnect?: (() => void) | null;
		duration?: number | null;
	}

	export interface SoundManagerAudioFormat {
		type: Array<string>;
		required: boolean;
		related?: Array<string>;
	}

	export interface SoundManagerProps {
		/**
		 * The directory where SM2 can find the flash movies (soundmanager2.swf,
		 * soundmanager2_flash9.swf and debug versions etc.) Note that SM2 will
		 * append the correct SWF file name, depending on flashVersion and
		 * debugMode settings.
		 */
		url?: string;

		allowScriptAccess?: ScriptAccess;
		altURL?: string;
		bgColor?: string;
		consoleOnly?: boolean;
		debugMode?: boolean;
		debugFlash?: boolean;
		/**
		 * Some properties are dynamic, determined at initialisation or later
		 * during runtime, and should be treated as read-only.
		 */
		readonly features?: Record<string, unknown>;

		flashVersion?: number;
		// flashPollingInterval: number;
		forceUseGlobalHTML5Audio?: boolean;
		readonly html5Only?: boolean;
		// html5PollingInterval: number;
		// html5Test: string;
		flashLoadTimeout?: number;
		idPrefix?: string;
		ignoreMobileRestrications?: boolean;
		noSWFCache?: boolean;
		preferFlash?: boolean;
		useAltURL?: boolean;
		useConsole?: boolean;
		useFlashBlock?: boolean;
		useHighPerformance?: boolean;
		useHTML5Audio?: boolean;
		waitForWindowLoad?: false;
		wmode?: string | null;

		defaultOptions?: DefaultOptions;
		flash9Options?: Flash9Options;
		movieStarOptions?: MovieStarOptions;

		onready?(): void;

		ontimeout?(): void;
	}

	export interface SoundManager extends SoundManagerProps {
		audioFormats?: { [audioFormat: string]: SoundManagerAudioFormat };

		canPlayLink(domElement: HTMLElement): boolean;

		canPlayMIME(MIMEtype: string): boolean;

		canPlayURL(mediaURL: string): boolean;

		clearOnPosition(id: string, msecOffset: number, callback?: (() => void)): SMSound;

		/**
		 * Creates a sound object, supporting an arbitrary number of optional arguments. Returns a SMSound object instance. At minimum, a url parameter is required.
		 */
		createSound(properties: SoundProperties): SMSound;

		destroySound(id: string): void;

		getMemoryUse(): number;

		getSoundById(id: string): SMSound;

		load(id: string, options?: Record<string, unknown>): SMSound;

		mute(id?: string): SMSound;

		ok(): boolean;

		onPosition(id: string, msecOffset: number, callback: (eventPosition: any) => void): SMSound;

		pause(id: string): SMSound;

		pauseAll(): void;

		play(id?: string, options?: DefaultOptions | Flash9Options): SMSound;

		reboot(): void;

		reset(): void;

		resume(id: string): SMSound;

		resumeAll(): void;

		setup(options: SoundManagerProps): SoundManager;

		setPan(id: string, volume: number): SMSound;

		setPlaybackRate(id: string, playbackRate: number): void;

		setPosition(id: string, msecOffset: number): SMSound;

		setVolume(id: string, volume: number): SMSound;

		/**
		 * Sets the volume of all sound objects. Accepted values: 0-100. Affects volume property.
		 * @param volume Volume of all sound objects. Accepted values: 0 - 100
		 */
		setVolume(volume: number): void;

		stop(id: string): SMSound;

		stopAll(): void;

		toggleMute(id: string): SMSound;

		togglePause(id: string): SMSound;

		unload(id: string): SMSound;

		unmute(id?: string): SMSound;
	}

	export interface SMSound {
		// Parameters, instance options.
		id: string;
		pan: number;
		peekData: PeekData;
		position: number;
		url: string;
		volume: number;

		// Dynamic Properties
		buffered: Array<any>;
		bytesLoaded: number | null;
		bytesTotal: number | null;
		isBuffering: boolean;
		connected: boolean;
		duration: number | null;
		durationEstimate: number | null;
		isHTML5: boolean;
		loaded: boolean;
		muted: boolean;
		paused: boolean;
		playState: number;
		readyState: number;

		// Events
		onbufferchange?: (() => void);
		onconnect?: (() => void);
		ondataerror?: (() => void);
		onerror?: ((errorCode: number, description: string) => void);
		onload?: ((success: boolean) => void);
		onfinish?: (() => void);
		onpause?: (() => void);
		onplay?: (() => void);
		onresume?: (() => void);
		onsuspend?: (() => void);
		onstop?: (() => void);
		onid3?: (() => void);
		whileloading?: (() => void);
		whileplaying?: (() => void);

		// Methods
		destruct(): void;

		load(options: Record<string, unknown>): SMSound;

		// clearOnPosition(): void;
		onPosition(mescOffest: number, callback: (eventPosition: any) => void): SMSound;

		mute(): SMSound;

		pause(): SMSound;

		play(id?: string, options?: DefaultOptions): SMSound;

		resume(): SMSound;

		setPan(volume: number): SMSound;

		setPosition(msecOffset: number): SMSound;

		setVolume(volume: number): SMSound;

		setPlaybackRate(speed: number): SMSound;

		stop(): SMSound;

		toggleMute(): SMSound;

		togglePause(): SMSound;

		unload(): SMSound;

		unmute(): SMSound;
	}

	export interface PeekData {
		left: number;
		right: number;
	}

	export interface SoundProperties extends DefaultOptions {
		url: string;
		id?: string;
	}

	export interface GetInstance {
		// eslint-disable-next-line @typescript-eslint/prefer-function-type
		(): SoundManager;
	}

	export const soundManager: SoundManager;
}
