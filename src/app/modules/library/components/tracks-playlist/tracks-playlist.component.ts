import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-tracks-playlist',
	templateUrl: 'tracks-playlist.component.html',
	styleUrls: ['tracks-playlist.component.scss']
})
export class TracksPlaylistComponent {
	@Input() tracks: Array<Jam.Track>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(public player: PlayerService, public navig: NavigService, public actions: ActionsService) {
	}

	onDrop(event: CdkDragDrop<Jam.Track>): void {
		moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
	}

	tapTrack(event, track: Jam.Track): void {
		if (event.tapCount === 2) {
			this.player.startTrack(track);
		}
	}
}
