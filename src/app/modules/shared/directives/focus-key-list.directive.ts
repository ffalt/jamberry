import {FocusKeyManager} from '@angular/cdk/a11y';
import {AfterContentInit, ContentChildren, Directive, HostBinding, HostListener, Input, OnDestroy, QueryList} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FocusKeyListItemDirective} from './focus-key-list-item.directive';

@Directive({
	selector: '[appFocusKeyList]'
})
export class FocusKeyListDirective implements AfterContentInit, OnDestroy {
	@Input() withWrap = true;
	@HostBinding() tabindex = '0';
	@HostBinding('attr.role') role = 'list';
	@ContentChildren(FocusKeyListItemDirective, {descendants: true}) components!: QueryList<FocusKeyListItemDirective>;
	protected keyManager?: FocusKeyManager<FocusKeyListItemDirective>;
	protected unsubscribe = new Subject();

	ngAfterContentInit() {
		this.processKeyList();
		this.components.changes.pipe(takeUntil(this.unsubscribe)).subscribe(_ => {
			this.processKeyList();
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	private processKeyList() {
		this.keyManager = new FocusKeyManager<FocusKeyListItemDirective>(this.components);
		if (this.withWrap) {
			this.keyManager.withWrap();
		}
	}

	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		console.log(event, this.components);
		this.keyManager?.onKeydown(event);
	}
}
