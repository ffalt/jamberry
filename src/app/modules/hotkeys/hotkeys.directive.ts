import {Directive, ElementRef, type OnDestroy, type OnInit, inject, input} from '@angular/core';
import Mousetrap from 'mousetrap';
import {type ExtendedKeyboardEvent, Hotkey} from './hotkeys.model';
import {HotkeysService} from './hotkeys.service';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[hotkeys]',
	providers: [HotkeysService],
	standalone: false
})
export class HotkeysDirective implements OnInit, OnDestroy {
	readonly hotkeys = input<Array<{
		[combo: string]: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent;
	}>>([]);
	private readonly hotkeysService = inject(HotkeysService);
	private readonly elementRef = inject(ElementRef);
	private readonly mousetrap: Mousetrap.MousetrapInstance;
	private readonly hotkeysList: Array<Hotkey> = [];
	private readonly oldHotkeys: Array<Hotkey> = [];

	constructor() {
		this.mousetrap = new Mousetrap(this.elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
	}

	ngOnInit(): void {
		for (const hotkey of this.hotkeys()) {
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
