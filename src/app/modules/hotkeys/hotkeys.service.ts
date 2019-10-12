import {Inject, Injectable} from '@angular/core';
// tslint:disable-next-line:no-import-side-effect
import 'mousetrap';
import {Hotkey} from './hotkeys.model';
import {HotkeysOptions, IHotkeyOptions} from './hotkeys.options';

@Injectable()
export class HotkeysService {
	hotkeys: Array<Hotkey> = [];
	pausedHotkeys: Array<Hotkey> = [];
	mousetrap: MousetrapInstance;

	private _preventIn = ['INPUT', 'SELECT', 'TEXTAREA'];

	constructor(@Inject(HotkeysOptions) private options: IHotkeyOptions) {
		Mousetrap.prototype.stopCallback = (event: KeyboardEvent, element: HTMLElement, combo: string, callback: () => void) => {
			// if the element has the class "mousetrap" then no need to stop
			if ((` ${element.className} `).includes(' mousetrap ')) {
				return false;
			}
			return (element.contentEditable && element.contentEditable === 'true');
		};
		this.mousetrap = new (Mousetrap as any)();
	}

	add(hotkey: Hotkey | Array<Hotkey>, specificEvent?: string): Hotkey | Array<Hotkey> {
		if (Array.isArray(hotkey)) {
			const temp: Array<Hotkey> = [];
			for (const key of hotkey) {
				temp.push(this.add(key, specificEvent) as Hotkey);
			}
			return temp;
		}
		this.remove(hotkey);
		this.hotkeys.push(hotkey);
		this.mousetrap.bind((hotkey).combo, (event: KeyboardEvent, combo: string) => {
			let shouldExecute = true;

			// if the callback is executed directly `hotkey.get('w').callback()`
			// there will be no event, so just execute the callback.
			if (event) {
				const target: HTMLElement = (event.target || event.srcElement) as HTMLElement; // srcElement is IE only
				const nodeName: string = target.nodeName.toUpperCase();

				// check if the input has a mousetrap class, and skip checking preventIn if so
				if ((` ${target.className} `).includes(' mousetrap ')) {
					shouldExecute = true;
				} else if (this._preventIn.includes(nodeName) && !hotkey.allowIn.map(allow => allow.toUpperCase()).includes(nodeName)) {
					// don't execute callback if the event was fired from inside an element listed in preventIn but not in allowIn
					shouldExecute = false;
				}
			}

			if (shouldExecute) {
				return (hotkey).callback.apply(this, [event, combo]);
			}
		}, specificEvent);
		return hotkey;
	}

	remove(hotkey?: Hotkey | Array<Hotkey>): Hotkey | Array<Hotkey> | undefined {
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
	}

	get(combo?: string | Array<string>): Hotkey | Array<Hotkey> | undefined {
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

	pause(hotkey?: Hotkey | Array<Hotkey>): Hotkey | Array<Hotkey> {
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

	unpause(hotkey?: Hotkey | Array<Hotkey>): Hotkey | Array<Hotkey> | undefined {
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
		if (index > -1) {
			this.add(hotkey);
			return this.pausedHotkeys.splice(index, 1);
		}
	}

	reset(): void {
		this.mousetrap.reset();
	}

	private findHotkey(hotkey: Hotkey): number {
		return this.hotkeys.indexOf(hotkey);
	}
}
