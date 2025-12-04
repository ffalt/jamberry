import { Component, inject } from '@angular/core';
import type { TabComponent } from '@modules/tab-portal';
import { PlayerCurrentInfoComponent } from '../../../player/components/player-current-info/player-current-info.component';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-tab-info',
	templateUrl: './tab-info.component.html',
	styleUrls: ['./tab-info.component.scss'],
	imports: [PlayerCurrentInfoComponent]
})
export class TabInfoComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);

	onActivate(): void {
		//
	}
}
