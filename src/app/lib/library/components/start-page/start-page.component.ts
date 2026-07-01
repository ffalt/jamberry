import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { JamService } from '@jam';
import { StartSectionsComponent } from '../start-sections/start-sections.component';
import { StartStatsComponent } from '../start-stats/start-stats.component';
import { LogoIconComponent } from '@core/components/logo-icon/logo-icon.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-page-start',
	templateUrl: './start-page.component.html',
	styleUrls: ['./start-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [StartStatsComponent, StartSectionsComponent, LogoIconComponent, RouterLink]
})
export class StartPageComponent {
	readonly jam = inject(JamService);
}
