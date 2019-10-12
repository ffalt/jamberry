import {Component} from '@angular/core';
import {routes} from '../../admin.routing';

export interface SectionCardsSection {
	id: string;
	text: string;
	icon?: string;
}

@Component({
	selector: 'app-admin-section-cards',
	templateUrl: 'section-cards.component.html',
	styleUrls: ['section-cards.component.scss']
})
export class SectionCardsComponent {
	sections: Array<SectionCardsSection> = [];

	constructor() {
		this.sections = routes[0].children
			.filter(route => route.path.length > 0 && route.data && route.data.name)
			.map(route =>
				({
					id: route.data && route.data.link ? route.data.link : route.path,
					text: route.data ? route.data.name : '',
					icon: route.data && route.data.icon ? route.data.icon : 'icon-admin'
				}));
	}

	trackByFn(index: number, section: SectionCardsSection): string {
		return section.id;
	}

}
