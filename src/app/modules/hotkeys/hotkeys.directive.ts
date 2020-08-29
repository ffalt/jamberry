import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
// tslint:disable-next-line:no-import-side-effect
import 'mousetrap';
import {ExtendedKeyboardEvent, Hotkey} from './hotkeys.model';
import {HotkeysService} from './hotkeys.service';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[hotkeys]',
	providers: [HotkeysService]
})
export class HotkeysDirective implements OnInit, OnDestroy {
	@Input() hotkeys: Array<{ [combo: string]: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent }> = [];

	private mousetrap: MousetrapInstance;
	private hotkeysList: Array<Hotkey> = [];
	private oldHotkeys: Array<Hotkey> = [];

	constructor(private _hotkeysService: HotkeysService, private _elementRef: ElementRef) {
		this.mousetrap = new Mousetrap(this._elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
	}

	ngOnInit(): void {
		for (const hotkey of this.hotkeys) {
			const combo = Object.keys(hotkey)[0];
			const hotkeyObj: Hotkey = new Hotkey(combo, hotkey[combo]);
			const oldHotkey: Hotkey = this._hotkeysService.get(combo) as Hotkey;
			if (oldHotkey !== null) { // We let the user overwrite callbacks temporarily if you specify it in HTML
				this.oldHotkeys.push(oldHotkey);
				this._hotkeysService.remove(oldHotkey);
			}
			this.hotkeysList.push(hotkeyObj);
			this.mousetrap.bind(hotkeyObj.combo, hotkeyObj.callback);
		}
	}

	ngOnDestroy(): void {
		for (const hotkey of this.hotkeysList) {
			this.mousetrap.unbind(hotkey.combo);
		}
		this._hotkeysService.add(this.oldHotkeys);
	}

}
