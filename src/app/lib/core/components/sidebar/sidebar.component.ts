import { FocusKeyManager } from '@angular/cdk/a11y';
import { type AfterViewInit, Component, DestroyRef, inject, input, signal, viewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { SidebarListItemComponent } from '../sidebar-list-item/sidebar-list-item.component';
import { type SidebarList, SidebarListComponent } from '../sidebar-list/sidebar-list.component';
import { AppService, type SidebarProvider } from '../../services/app/app.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	host: {
		'[class.active]': 'collapsed',
		'[class.show]': 'showMobileNavig()'
	},
	imports: [SidebarListComponent]
})
export class SidebarComponent implements AfterViewInit, SidebarProvider {
	readonly sections = input<Array<SidebarList>>([]);
	readonly listName = input<string>('');
	collapsed: boolean = false;
	readonly showMobileNavig = signal(false);
	private readonly app = inject(AppService);
	private readonly router = inject(Router);
	private readonly lifeRef = inject(DestroyRef);
	private readonly items = viewChildren(SidebarListComponent);
	private keyManager: FocusKeyManager<SidebarListItemComponent> | undefined;

	constructor() {
		this.app.view.currentSidebar = this;
		this.router.events
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.showMobileNavig.set(false);
			});
		this.lifeRef.onDestroy(() => {
			this.app.view.currentSidebar = undefined;
		});
	}

	toggleMobileNavig(): void {
		this.showMobileNavig.update(v => !v);
	}

	onNavigate(): void {
		this.showMobileNavig.set(false);
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
