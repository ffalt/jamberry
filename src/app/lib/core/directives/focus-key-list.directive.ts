import { FocusKeyManager } from '@angular/cdk/a11y';
import { type AfterContentInit, ContentChildren, DestroyRef, Directive, inject, input, type QueryList } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusKeyListItemDirective } from './focus-key-list-item.directive';

@Directive({
	selector: '[appFocusKeyList]',
	host: {
		'[attr.tabindex]': 'settabindex()',
		'(keydown)': 'onKeydown($event)'
	}
})
export class FocusKeyListDirective implements AfterContentInit {
	readonly withWrap = input(true);

	readonly settabindex = input<string | undefined>('0');
	@ContentChildren(FocusKeyListItemDirective, { descendants: true }) components!: QueryList<FocusKeyListItemDirective>;
	protected keyManager?: FocusKeyManager<FocusKeyListItemDirective>;
	private readonly lifeRef = inject(DestroyRef);

	ngAfterContentInit() {
		this.processKeyList();
		this.components.changes
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.processKeyList();
			});
	}

	onKeydown(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	private processKeyList() {
		this.keyManager = new FocusKeyManager<FocusKeyListItemDirective>(this.components);
		if (this.withWrap()) {
			this.keyManager.withWrap();
		}
	}
}
