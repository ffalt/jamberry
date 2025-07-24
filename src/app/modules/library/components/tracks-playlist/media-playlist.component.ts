import {type CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, inject, input} from '@angular/core';
import {PlayerService} from '@core/services';
import type {Jam} from '@jam';

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

	playTrack(media: Jam.MediaBase): void {
		this.player.startTrack(media);
	}
}
