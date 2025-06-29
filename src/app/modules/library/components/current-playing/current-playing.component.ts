import {Component, inject} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-current-playing',
	templateUrl: './current-playing.component.html',
	styleUrls: ['./current-playing.component.scss'],
	standalone: false
})
export class CurrentPlayingComponent {
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
}
