import {Component, inject} from '@angular/core';
import type {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';

@Component({
	selector: 'app-tab-player',
	templateUrl: './tab-player.component.html',
	styleUrls: ['./tab-player.component.scss'],
	standalone: false
})
export class TabPlayerComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);

	onActivate(): void {
		//
	}
}
