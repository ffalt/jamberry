import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Input, inject} from '@angular/core';
import {PlayerService} from '@core/services';
import {Jam} from '@jam';

@Component({
	selector: 'app-media-playlist',
	templateUrl: './media-playlist.component.html',
	styleUrls: ['./media-playlist.component.scss'],
	standalone: false
})
export class MediaPlaylistComponent {
	@Input() entries?: Array<Jam.MediaBase>;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;
	private readonly player = inject(PlayerService);

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
