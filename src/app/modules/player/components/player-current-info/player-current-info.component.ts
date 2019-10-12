import {Component} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {JamService} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-player-current-info',
	templateUrl: 'player-current-info.component.html',
	styleUrls: ['player-current-info.component.scss']
})
export class PlayerCurrentInfoComponent implements TabComponent {

	constructor(public player: PlayerService, public navig: NavigService, private jam: JamService, private notify: NotifyService, public actions: ActionsService) {
	}

	onActivate(): void {
		//
	}

}
