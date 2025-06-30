import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, inject, input} from '@angular/core';
import {PlayerService} from '@core/services';
import {Jam} from '@jam';

@Component({
	selector: 'app-media-playlist',
	templateUrl: './media-playlist.component.html',
	styleUrls: ['./media-playlist.component.scss'],
	standalone: false
})
export class MediaPlaylistComponent {
	readonly entries = input<Array<Jam.MediaBase>>();
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
	private readonly player = inject(PlayerService);

	onDrop(event: CdkDragDrop<Jam.MediaBase>): void {
		const entries = this.entries();
		if (entries) {
			moveItemInArray(entries, event.previousIndex, event.currentIndex);
		}
	}

	tapTrack(event: Event & { tapCount?: number }, media: Jam.MediaBase): void {
		if (event.tapCount === 2) {
			this.player.startTrack(media);
		}
	}
}
