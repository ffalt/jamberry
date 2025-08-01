import {Injectable} from '@angular/core';
import Mousetrap from 'mousetrap';
import type {Hotkey} from './hotkeys.model';

type HotkeyLike = Hotkey | Array<Hotkey>;

@Injectable()
export class HotkeysService {
	hotkeys: Array<Hotkey> = [];
	pausedHotkeys: Array<Hotkey> = [];
	mousetrap: Mousetrap.MousetrapInstance;

	private readonly preventIn = ['INPUT', 'SELECT', 'TEXTAREA'];

	constructor() {
		Mousetrap.prototype.stopCallback = (_event: KeyboardEvent, element: HTMLElement): boolean => {
			// if the element has the class "mousetrap" then no need to stop
			if ((` ${element.className} `).includes(' mousetrap ')) {
				return false;
			}
			return (element.contentEditable === 'true');
		};
		this.mousetrap = new (Mousetrap as any)();
	}

	add(hotkey: HotkeyLike, specificEvent?: string): HotkeyLike {
		if (Array.isArray(hotkey)) {
			const temp: Array<Hotkey> = [];
			for (const key of hotkey) {
				temp.push(this.add(key, specificEvent) as Hotkey);
			}
			return temp;
		}
		this.remove(hotkey);
		this.hotkeys.push(hotkey);
		const mousetrapFN = (event: KeyboardEvent, combo: string): any => {
			let shouldExecute = true;

			// if the callback is executed directly `hotkey.get('w').callback()`
			// there will be no event, so just execute the callback.
			if (event) {
				const target = event.target as HTMLElement;
				if (!target) {
					return;
				}
				const nodeName: string = target.nodeName.toUpperCase();
				// check if the input has a mousetrap class, and skip checking preventIn if so
				// don't execute callback if the event was fired from inside an element listed in preventIn but not in allowIn
				shouldExecute = (` ${target.className} `).includes(' mousetrap ') ||
					!(this.preventIn.includes(nodeName) &&
						!(hotkey.allowIn || []).map(allow => allow.toUpperCase()).includes(nodeName));
			}
			if (shouldExecute) {
				return Reflect.apply((hotkey).callback, this, [event, combo]);
			}
			return;
		};
		this.mousetrap.bind((hotkey).combo, mousetrapFN, specificEvent);
		return hotkey;
	}

	remove(hotkey?: HotkeyLike): HotkeyLike | undefined {
		const temp: Array<Hotkey> = [];
		if (!hotkey) {
			for (const key of this.hotkeys) {
				temp.push(this.remove(key) as Hotkey);
			}
			return temp;
		}
		if (Array.isArray(hotkey)) {
			for (const key of hotkey) {
				temp.push(this.remove(key) as Hotkey);
			}
			return temp;
		}
		const index = this.findHotkey(hotkey);
		if (index > -1) {
			this.hotkeys.splice(index, 1);
			this.mousetrap.unbind((hotkey).combo);
			return hotkey;
		}
		return;
	}

	get(combo?: string | Array<string>): HotkeyLike | undefined {
		if (!combo) {
			return this.hotkeys;
		}
		if (Array.isArray(combo)) {
			const temp: Array<Hotkey> = [];
			for (const key of combo) {
				temp.push(this.get(key) as Hotkey);
			}
			return temp;
		}
		return this.hotkeys.find(hotk => hotk.combo.includes(combo));
	}

	pause(hotkey?: HotkeyLike): HotkeyLike {
		if (!hotkey) {
			return this.pause(this.hotkeys);
		}
		if (Array.isArray(hotkey)) {
			const temp: Array<Hotkey> = [];
			for (const key of hotkey) {
				temp.push(this.pause(key) as Hotkey);
			}
			return temp;
		}
		this.remove(hotkey);
		this.pausedHotkeys.push(hotkey);
		return hotkey;
	}

	unpause(hotkey?: HotkeyLike): HotkeyLike | undefined {
		if (!hotkey) {
			return this.unpause(this.pausedHotkeys);
		}
		if (Array.isArray(hotkey)) {
			const temp: Array<Hotkey> = [];
			for (const key of hotkey) {
				temp.push(this.unpause(key) as Hotkey);
			}
			return temp;
		}
		const index: number = this.pausedHotkeys.indexOf(hotkey);
		if (index !== -1) {
			this.add(hotkey);
			return this.pausedHotkeys.splice(index, 1);
		}
		return;
	}

	reset(): void {
		this.mousetrap.reset();
	}

	private findHotkey(hotkey: Hotkey): number {
		return this.hotkeys.indexOf(hotkey);
	}
}
