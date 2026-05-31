import { Component, type Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../app.routing';
import { IconartImageComponent } from '@core/components/iconart-image/iconart-image.component';
import { IconAdminComponent } from '@core/components/icons/icon-admin.component';

export interface SectionCardsSection {
	id: string;
	text: string;
	icon?: Type<unknown>;
}

@Component({
	selector: 'app-admin-section-cards',
	templateUrl: './section-cards.component.html',
	styleUrls: ['./section-cards.component.scss'],
	imports: [RouterModule, IconartImageComponent]
})
export class SectionCardsComponent {
	sections: Array<SectionCardsSection> = [];

	constructor() {
		const root = routes.find(r => r.path === 'admin')!;
		this.sections = (root.children ?? [])
			.filter(route => route.path && route.path.length > 0 && route.data?.name)
			.map(route =>
				({
					id: route.data?.link ?? route.path ?? '',
					text: route.data?.name ?? '',
					icon: route.data?.icon ?? IconAdminComponent
				}));
	}
}
