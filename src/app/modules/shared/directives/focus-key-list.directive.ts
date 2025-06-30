import {FocusKeyManager} from '@angular/cdk/a11y';
import {AfterContentInit, Directive, HostBinding, HostListener, OnDestroy, contentChildren, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FocusKeyListItemDirective} from './focus-key-list-item.directive';

@Directive({
	selector: '[appFocusKeyList]',
	standalone: false
})
export class FocusKeyListDirective implements AfterContentInit, OnDestroy {
	readonly withWrap = input(true);
	@HostBinding('attr.tabindex')
	readonly settabindex = input<string | undefined>('0');
	readonly components = contentChildren(FocusKeyListItemDirective, {descendants: true});
	protected keyManager?: FocusKeyManager<FocusKeyListItemDirective>;
	private readonly unsubscribe = new Subject<void>();

	ngAfterContentInit() {
		this.processKeyList();
		toObservable(this.components)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.processKeyList());
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	private processKeyList() {
		this.keyManager = new FocusKeyManager<FocusKeyListItemDirective>(this.components());
		if (this.withWrap()) {
			this.keyManager.withWrap();
		}
	}

}
