import {FocusKeyManager} from '@angular/cdk/a11y';
import {
	AfterViewInit,
	Component,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChildren
} from '@angular/core';
import {Router} from '@angular/router';
import {AppService, SidebarProvider} from '@core/services';
import {SidebarListItemComponent} from '../sidebar-list-item/sidebar-list-item.component';
import {SidebarList, SidebarListComponent} from '../sidebar-list/sidebar-list.component';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnInit, OnDestroy, SidebarProvider {
	@Input() sections: Array<SidebarList> = [];
	@Input() listName: string = '';
	@HostBinding('class.active') collapsed: boolean = false;
	@ViewChildren(SidebarListComponent) items!: QueryList<SidebarListComponent>;
	@HostBinding('tabindex') tabindex = '0';
	showMobileNavig: boolean = false;
	private keyManager: FocusKeyManager<SidebarListItemComponent> | undefined;

	constructor(public app: AppService, protected router: Router) {
	}

	ngOnInit(): void {
		this.app.view.currentSidebar = this;
		this.router.events.forEach(_ => {
			this.showMobileNavig = false;
		}).catch(e => {
			console.error(e);
		});
	}

	ngOnDestroy(): void {
		this.app.view.currentSidebar = undefined;
	}

	toggleMobileNavig(): void {
		this.showMobileNavig = !this.showMobileNavig;
	}

	onNavigate(): void {
		this.showMobileNavig = false;
	}

	@HostListener('keydown.arrowUp', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
	manage(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	ngAfterViewInit(): void {
		const matrix = this.items.map(e => e.items.toArray());
		const merged = ([] as Array<SidebarListItemComponent>).concat(...matrix);
		this.keyManager = new FocusKeyManager(merged).withWrap();
	}

	trackByFn(index: number, node: SidebarList): string {
		return node.name;
	}

	toggle() {
		this.collapsed = !this.collapsed;
	}
}
