import {Component} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-current-playing',
	templateUrl: './current-playing.component.html',
	styleUrls: ['./current-playing.component.scss']
})
export class CurrentPlayingComponent {

	constructor(public player: PlayerService, public actions: ActionsService, public navig: NavigService) {
	}

}
