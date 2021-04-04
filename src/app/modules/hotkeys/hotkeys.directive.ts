import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import * as Mousetrap from 'mousetrap';
import {ExtendedKeyboardEvent, Hotkey} from './hotkeys.model';
import {HotkeysService} from './hotkeys.service';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[hotkeys]',
	providers: [HotkeysService]
})
export class HotkeysDirective implements OnInit, OnDestroy {
	@Input() hotkeys: Array<{ [combo: string]: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent }> = [];

	private mousetrap: Mousetrap.MousetrapInstance;
	private hotkeysList: Array<Hotkey> = [];
	private oldHotkeys: Array<Hotkey> = [];

	constructor(private hotkeysService: HotkeysService, private elementRef: ElementRef) {
		this.mousetrap = new Mousetrap(this.elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
	}

	ngOnInit(): void {
		for (const hotkey of this.hotkeys) {
			const combo = Object.keys(hotkey)[0];
			const hotkeyObj: Hotkey = new Hotkey(combo, hotkey[combo]);
			const oldHotkey: Hotkey = this.hotkeysService.get(combo) as Hotkey;
			if (oldHotkey !== null) { // We let the user overwrite callbacks temporarily if you specify it in HTML
				this.oldHotkeys.push(oldHotkey);
				this.hotkeysService.remove(oldHotkey);
			}
			this.hotkeysList.push(hotkeyObj);
			this.mousetrap.bind(hotkeyObj.combo, hotkeyObj.callback);
		}
	}

	ngOnDestroy(): void {
		for (const hotkey of this.hotkeysList) {
			this.mousetrap.unbind(hotkey.combo);
		}
		this.hotkeysService.add(this.oldHotkeys);
	}

}
