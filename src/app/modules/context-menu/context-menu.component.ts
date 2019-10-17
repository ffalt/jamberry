import {
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnDestroy,
	Optional,
	Output,
	QueryList,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {ContextMenuItemDirective} from './context-menu.item.directive';
import {ContextMenuOptions} from './context-menu.options';
import {CloseContextMenuEvent, ContextMenuClickEvent, ContextMenuService} from './context-menu.service';
import {CONTEXT_MENU_OPTIONS} from './context-menu.tokens';

export interface LinkConfig {
	click(item: any, $event?: MouseEvent): void;

	enabled?(item: any): boolean;

	html(item: any): string;
}

@Component({
	// tslint:disable-next-line:use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None,
	// tslint:disable-next-line:component-selector
	selector: 'context-menu',
	styleUrls: ['./context-menu.component.scss'],
	template: ''
})
export class ContextMenuComponent implements OnDestroy {
	@Input() menuClass = '';
	@Input() autoFocus = false;
	@Input() disabled = false;
	@Output() readonly menuClose: EventEmitter<CloseContextMenuEvent> = new EventEmitter();
	@Output() readonly menuOpen: EventEmitter<ContextMenuClickEvent> = new EventEmitter();
	@ContentChildren(ContextMenuItemDirective) menuItems: QueryList<ContextMenuItemDirective>;
	@ViewChild('menu', {static: true}) menuElement: ElementRef;
	visibleMenuItems: Array<ContextMenuItemDirective> = [];
	// links: Array<LinkConfig> = [];
	item: any;
	event: MouseEvent | KeyboardEvent;
	protected unsubscribe = new Subject();

	constructor(
		private _contextMenuService: ContextMenuService,
		private changeDetector: ChangeDetectorRef,
		private elementRef: ElementRef,
		@Optional() @Inject(CONTEXT_MENU_OPTIONS) private options: ContextMenuOptions
	) {
		if (options) {
			this.autoFocus = options.autoFocus;
		}
		_contextMenuService.show
			.pipe(takeUntil(this.unsubscribe)).subscribe(menuEvent => {
			this.onMenuEvent(menuEvent);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onMenuEvent(menuEvent: ContextMenuClickEvent): void {
		if (this.disabled) {
			return;
		}
		const {contextMenu, event, item} = menuEvent;
		if (contextMenu && contextMenu !== this) {
			return;
		}
		this.event = event;
		this.item = item;
		this.setVisibleMenuItems();
		this._contextMenuService.openContextMenu({...menuEvent, menuItems: this.visibleMenuItems, menuClass: this.menuClass});
		this._contextMenuService.close.asObservable()
			.pipe(first(),
				takeUntil(this.unsubscribe)).subscribe(closeEvent => {
			this.menuClose.emit(closeEvent);
		});
		this.menuOpen.next(menuEvent);
	}

	isMenuItemVisible(menuItem: ContextMenuItemDirective): boolean {
		return this.evaluateIfFunction(menuItem.visible);
	}

	setVisibleMenuItems(): void {
		this.visibleMenuItems = this.menuItems.filter(menuItem => this.isMenuItemVisible(menuItem));
	}

	evaluateIfFunction(value: any): boolean {
		return (value instanceof Function) ? value(this.item) : value;
	}
}
