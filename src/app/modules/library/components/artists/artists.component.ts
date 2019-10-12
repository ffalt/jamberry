import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-artists',
	templateUrl: 'artists.component.html',
	styleUrls: ['artists.component.scss']
})
export class ArtistsComponent {
	@Input() artists: Array<Jam.Artist>;
	@Input() viewTypeList: boolean = false;

	constructor(public navig: NavigService, public player: PlayerService, public actions: ActionsService) {
	}

}
