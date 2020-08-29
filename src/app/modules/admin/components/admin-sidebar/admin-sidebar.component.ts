import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService, SidebarProvider} from '@core/services';
import {routes} from '../../admin.routing';

export interface AdminSidebarSection {
	id: string;
	text: string;
	icon: string;
}

@Component({
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, OnDestroy, SidebarProvider {
	collapsed: { [sectionName: string]: boolean } = {};
	sections: Array<AdminSidebarSection> = [];
	showMobileNavig: boolean = false;

	constructor(private app: AppService, private router: Router) {
		const root = routes[0];
		this.sections = (root.children || [])
			.filter(route => route.path && route.path.length > 0 && route.data?.name)
			.map(route =>
				({
					id: route.data && route.data.link ? route.data.link : route.path,
					text: route.data ? route.data.name : '',
					icon: route.data && route.data.icon ? route.data.icon : 'icon-admin'
				}));
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

	trackByFn(index: number, section: AdminSidebarSection): string {
		return section.id;
	}

	toggleMobileNavig(): void {
		this.showMobileNavig = !this.showMobileNavig;
	}

}
