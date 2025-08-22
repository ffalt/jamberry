import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { MediaPlaylistHeaderComponent } from '../tracks-playlist-header/media-playlist-header.component';
import { MediaPlaylistItemComponent } from '../tracks-playlist-item/media-playlist-item.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-media-playlist',
	templateUrl: './media-playlist.component.html',
	styleUrls: ['./media-playlist.component.scss'],
	imports: [DragDropModule, MediaPlaylistHeaderComponent, MediaPlaylistItemComponent, BackgroundTextListComponent]
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
