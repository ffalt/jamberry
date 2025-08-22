import { Component } from '@angular/core';
import { routes } from '../../../../app.routing';
import type { SidebarList } from '@core/components/sidebar-list/sidebar-list.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styleUrls: ['./admin-sidebar.component.scss'],
	imports: [SidebarComponent]
})
export class AdminSidebarComponent {
	sections: Array<SidebarList> = [];

	constructor() {
		const root = routes.find(r => r.path === 'admin')!;
		const entries = (root.children ?? [])
			.filter(route => route.path && route.path.length > 0 && route.data?.name)
			.map(route =>
				({
					link: `/admin/${route.data?.link ?? route.path}`,
					name: route.data?.name ?? '',
					icon: route.data?.icon ?? 'icon-admin'
				}));
		this.sections = [{ name: 'Administration', entries }];
	}
}
