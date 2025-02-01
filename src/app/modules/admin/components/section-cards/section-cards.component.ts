import {Component} from '@angular/core';
import {routes} from '../../admin.routing';

export interface SectionCardsSection {
	id: string;
	text: string;
	icon?: string;
}

@Component({
    selector: 'app-admin-section-cards',
    templateUrl: './section-cards.component.html',
    styleUrls: ['./section-cards.component.scss'],
    standalone: false
})
export class SectionCardsComponent {
	sections: Array<SectionCardsSection> = [];

	constructor() {
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
}
