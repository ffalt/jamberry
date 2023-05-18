import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-playlist',
	templateUrl: './media-playlist.component.html',
	styleUrls: ['./media-playlist.component.scss']
})
export class MediaPlaylistComponent {
	@Input() entries?: Array<Jam.MediaBase>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;

	constructor(public player: PlayerService, public navig: NavigService, public actions: ActionsService) {
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trackByFn(index: number, value: Jam.MediaBase): string {
		return index.toString();
	}

	onDrop(event: CdkDragDrop<Jam.MediaBase>): void {
		if (this.entries) {
			moveItemInArray(this.entries, event.previousIndex, event.currentIndex);
		}
	}

	tapTrack(event: Event & { tapCount?: number }, media: Jam.MediaBase): void {
		if (event.tapCount === 2) {
			this.player.startTrack(media);
		}
	}

}
