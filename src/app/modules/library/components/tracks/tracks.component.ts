import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-tracks',
	templateUrl: 'tracks.component.html',
	styleUrls: ['tracks.component.scss']
})
export class TracksComponent {
	@Input() tracks: Array<Jam.Track>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(public navig: NavigService, public player: PlayerService, public actions: ActionsService) {

	}

	tapTrack(event, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
