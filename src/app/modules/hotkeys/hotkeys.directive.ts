import { Directive, ElementRef, inject, input, type OnDestroy, type OnInit } from '@angular/core';
import Mousetrap from 'mousetrap';
import { Hotkey } from './hotkeys.model';
import { type HotkeyLike, HotkeysService } from './hotkeys.service';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[hotkeys]',
	providers: [HotkeysService]
})
export class HotkeysDirective implements OnInit, OnDestroy {
	readonly hotkeys = input<Array<{
		[combo: string]: (event: KeyboardEvent, combo: string) => KeyboardEvent;
	}>>([]);

	private readonly hotkeysService = inject(HotkeysService);
	private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly mousetrap: Mousetrap.MousetrapInstance;
	private readonly hotkeysList: Array<Hotkey> = [];
	private readonly oldHotkeys: Array<HotkeyLike> = [];

	constructor() {
		this.mousetrap = new Mousetrap(this.elementRef.nativeElement); // Bind hotkeys to the current element (and any children)
	}

	ngOnInit(): void {
		for (const hotkey of this.hotkeys()) {
			const combo = Object.keys(hotkey)[0];
			const hotkeyObj: Hotkey = new Hotkey(combo, hotkey[combo]);
			const oldHotkey = this.hotkeysService.get(combo);
			if (oldHotkey) { // We let the user overwrite callbacks temporarily if you specify it in HTML
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
		for (const hotkey of this.oldHotkeys) {
			this.hotkeysService.add(hotkey);
		}
	}
}
