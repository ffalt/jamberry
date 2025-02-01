import {FocusKeyManager} from '@angular/cdk/a11y';
import {AfterContentInit, ContentChildren, Directive, HostBinding, HostListener, Input, OnDestroy, QueryList} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FocusKeyListItemDirective} from './focus-key-list-item.directive';

@Directive({
    selector: '[appFocusKeyList]',
    standalone: false
})
export class FocusKeyListDirective implements AfterContentInit, OnDestroy {
	@Input() withWrap = true;
	@Input() @HostBinding('attr.tabindex') settabindex?: string = '0';
	@Input() @HostBinding('attr.role') listRole = 'list';
	@ContentChildren(FocusKeyListItemDirective, {descendants: true}) components!: QueryList<FocusKeyListItemDirective>;
	protected keyManager?: FocusKeyManager<FocusKeyListItemDirective>;
	protected unsubscribe = new Subject<void>();

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

	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	private processKeyList() {
		this.keyManager = new FocusKeyManager<FocusKeyListItemDirective>(this.components);
		if (this.withWrap) {
			this.keyManager.withWrap();
		}
	}

}
