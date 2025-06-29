import {Component, inject} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';

@Component({
	selector: 'app-tab-info',
	templateUrl: './tab-info.component.html',
	styleUrls: ['./tab-info.component.scss'],
	standalone: false
})
export class TabInfoComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);

	onActivate(): void {
		//
	}
}
