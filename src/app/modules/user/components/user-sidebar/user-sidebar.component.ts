import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AppService, SidebarProvider} from '@core/services';
import {routes} from '../../user.routing';

export interface UserSidebarSection {
	id: string;
	text: string;
	link: string;
	icon: string;
	options: {
		exact: boolean;
	};
}

@Component({
	selector: 'app-user-sidebar',
	templateUrl: './user-sidebar.component.html',
	styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit, OnDestroy, SidebarProvider {
	collapsed: {
		[sectionName: string]: boolean;
		main?: boolean;
	} = {};
	sections: Array<UserSidebarSection> = [];
	showMobileNavig: boolean = false;

	constructor(private app: AppService, private router: Router) {
		const sections: Array<UserSidebarSection> = routes[0].children.filter(route => route.path.length > 0 && route.data && route.data.name).map(route => {
			const id = route.data && route.data.link ? route.data.link : route.path;
			return ({
				id,
				text: route.data ? route.data.name : '',
				icon: route.data && route.data.icon ? route.data.icon : 'icon-admin',
				link: '/user/' + id,
				options: {exact: false}
			});
		});
		const main: UserSidebarSection = {
			id: '',
			text: 'User',
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

	trackByFn(index: number, section: UserSidebarSection): string {
		return section.id;
	}

	toggleMobileNavig(): void {
		this.showMobileNavig = !this.showMobileNavig;
	}

}
