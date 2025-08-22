import { Component, input, output, viewChildren } from '@angular/core';
import type { LinkRoute } from '../../../../../@types/link-route';
import { routes } from '../../../../app.routing';
import { type SidebarListItem, SidebarListItemComponent } from '../sidebar-list-item/sidebar-list-item.component';

export interface SidebarList {
	name: string;
	entries: Array<SidebarListItem>;
}

export function collectSidebarListItems(section: string, path: string): SidebarList {
	const root = routes.find(r => r.path === path)! as LinkRoute;
	const main: SidebarListItem = {
		name: root.data?.name ?? '',
		icon: root.data?.icon ?? '',
		link: `/${path}`,
		options: { exact: true }
	};
	const entries = (root.children ?? [])
		.filter(route => route.path && route.path.length > 0 && route.data?.name)
		.map((route: LinkRoute) => {
			const id = route.data?.link ?? route.path;
			return ({
				name: route.data?.name ?? '',
				icon: route.data?.icon ?? '',
				link: `/${root.path}/${id}`
			});
		});
	return { name: section, entries: [main, ...entries] };
}

@Component({
	selector: 'app-sidebar-list',
	templateUrl: './sidebar-list.component.html',
	styleUrls: ['./sidebar-list.component.scss'],
	host: {
		'[class.active]': 'collapsed'
	},
	imports: [SidebarListItemComponent]
})
export class SidebarListComponent {
	readonly list = input.required<SidebarList>();
	readonly items = viewChildren(SidebarListItemComponent);
	readonly navigate = output();
	collapsed: boolean = false;

	onNavigate(): void {
		this.navigate.emit();
	}

	toggle() {
		this.collapsed = !this.collapsed;
	}
}
