import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SectionCardsComponent } from '../section-cards/section-cards.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';

@Component({
	selector: 'app-admin-start',
	templateUrl: './admin.start.component.html',
	styleUrls: ['./admin.start.component.scss'],
	imports: [RouterModule, SectionCardsComponent, HeaderSlimComponent]
})

export class AdminStartComponent {
}
