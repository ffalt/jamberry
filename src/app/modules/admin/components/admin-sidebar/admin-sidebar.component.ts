import {Component} from '@angular/core';
import type {SidebarList} from '@shared/components';
import {routes} from '../../admin.routing';

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss'],
    standalone: false
})
export class AdminSidebarComponent {
	sections: Array<SidebarList> = [];

	constructor() {
		const root = routes[0];
		const entries = (root.children || [])
			.filter(route => route.path && route.path.length > 0 && route.data?.name)
			.map(route =>
				({
					link: `/admin/${route.data?.link ?? route.path}`,
					name: route.data ? route.data.name : '',
					icon: route.data?.icon ?? 'icon-admin'
				}));
		this.sections = [{name: 'Administration', entries}];
	}
}
