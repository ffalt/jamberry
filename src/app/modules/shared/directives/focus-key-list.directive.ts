import {FocusKeyManager} from '@angular/cdk/a11y';
import {AfterContentInit, Directive, OnDestroy, input, ContentChildren, QueryList} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FocusKeyListItemDirective} from './focus-key-list-item.directive';

@Directive({
	selector: '[appFocusKeyList]',
	standalone: false,
	host: {
		'[attr.tabindex]': 'settabindex()',
		'(keydown)': 'onKeydown($event)'
	}
})
export class FocusKeyListDirective implements AfterContentInit, OnDestroy {
	readonly withWrap = input(true);

	readonly settabindex = input<string | undefined>('0');
	@ContentChildren(FocusKeyListItemDirective, {descendants: true}) components!: QueryList<FocusKeyListItemDirective>;
	protected keyManager?: FocusKeyManager<FocusKeyListItemDirective>;
	private readonly unsubscribe = new Subject<void>();

	ngAfterContentInit() {
		this.processKeyList();
		this.components.changes
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.processKeyList());
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
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
