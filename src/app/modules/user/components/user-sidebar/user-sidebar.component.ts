import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AppService, SidebarProvider} from '@core/services';
import {SidebarListItem} from '@shared/components';
import {routes} from '../../user.routing';

@Component({
	selector: 'app-user-sidebar',
	templateUrl: './user-sidebar.component.html',
	styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit, OnDestroy, SidebarProvider {
	sections: Array<SidebarListItem> = [];
	showMobileNavig: boolean = false;

	constructor(private app: AppService, private router: Router) {
		const root = routes[0];
		const sections: Array<SidebarListItem> = (root?.children || [])
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
		this.sections = [main].concat(sections);
	}

	ngOnInit(): void {
		this.app.view.currentSidebar = this;
		this.router.events.forEach(() => {
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

}
