import {Component} from '@angular/core';
import {SidebarList, SidebarListItem} from '@shared/components';
import {routes} from '../../user.routing';

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './user-sidebar.component.html',
    styleUrls: ['./user-sidebar.component.scss'],
    standalone: false
})
export class UserSidebarComponent {
	sections: Array<SidebarList> = [];

	constructor() {
		const root = routes[0];
		const entries: Array<SidebarListItem> = (root?.children || [])
			.filter(route => route.path && route.path.length > 0 && route.data?.name)
			.map(route => {
				const id = route.data?.link ? route.data.link : route.path;
				return ({
					name: route.data ? route.data.name : '',
					icon: route.data && route.data.icon ? route.data.icon : 'icon-admin',
					link: `/user/${id}`
				});
			});
		const main: SidebarListItem = {
			name: 'Profile',
			icon: 'icon-user',
			link: '/user',
			options: {exact: true}
		};
		this.sections = [{name: 'User', entries: [main].concat(entries)}];
	}
}
