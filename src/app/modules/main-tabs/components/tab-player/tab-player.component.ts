import {Component} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';

@Component({
	selector: 'app-tab-player',
	templateUrl: 'tab-player.component.html',
	styleUrls: ['tab-player.component.scss']
})
export class TabPlayerComponent implements TabComponent {

	constructor(public player: PlayerService, public navig: NavigService) {
	}

	onActivate(): void {
		//
	}
}
