import {FocusKeyManager} from '@angular/cdk/a11y';
import {type AfterViewInit, Component, type OnDestroy, type OnInit, inject, viewChildren, input} from '@angular/core';
import {Router} from '@angular/router';
import {AppService, type SidebarProvider} from '@core/services';
import type {SidebarListItemComponent} from '../sidebar-list-item/sidebar-list-item.component';
import {type SidebarList, SidebarListComponent} from '../sidebar-list/sidebar-list.component';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	standalone: false,
	host: {
		'[class.active]': 'collapsed',
		'[class.show]': 'showMobileNavig'
	}
})
export class SidebarComponent implements AfterViewInit, OnInit, OnDestroy, SidebarProvider {
	readonly sections = input<Array<SidebarList>>([]);
	readonly listName = input<string>('');
	collapsed: boolean = false;
	showMobileNavig: boolean = false;
	private readonly app = inject(AppService);
	private readonly router = inject(Router);
	private readonly items = viewChildren(SidebarListComponent);
	private keyManager: FocusKeyManager<SidebarListItemComponent> | undefined;

	ngOnInit(): void {
		this.app.view.currentSidebar = this;
		// qlty-ignore: biome:lint/complexity/noForEach
		// eslint-disable-next-line unicorn/no-array-for-each
		this.router.events.forEach(() => {
			this.showMobileNavig = false;
		}).catch(console.error);
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

	manageKey(event: Event) {
		this.keyManager?.onKeydown(event as KeyboardEvent);
	}

	ngAfterViewInit(): void {
		const matrix = this.items().map(e => e.items());
		// eslint-disable-next-line unicorn/prefer-spread
		const merged = ([] as Array<SidebarListItemComponent>).concat(...matrix);
		this.keyManager = new FocusKeyManager(merged).withWrap();
	}
}
