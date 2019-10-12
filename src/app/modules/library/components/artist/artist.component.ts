import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-artist',
	templateUrl: 'artist.component.html',
	styleUrls: ['artist.component.scss']
})
export class ArtistComponent {
	@Input() artist: Jam.Artist;

	constructor(public player: PlayerService, public actions: ActionsService, public navig: NavigService) {
	}

}
