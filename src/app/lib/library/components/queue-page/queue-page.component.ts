import { Component, inject } from '@angular/core';
import { QueueComponent } from '../../../player/components/queue/queue.component';
import { PlaylistDialogsService } from '@core/services/playlist-dialogs/playlist-dialogs.service';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { QueueService } from '@core/services/queue/queue.service';
import { IconPlaylistComponent } from '@core/components/icons/icon-playlist.component';
import { IconQueueComponent } from '@core/components/icons/icon-queue.component';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';
import { IconShuffleComponent } from '@core/components/icons/icon-shuffle.component';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss'],
	imports: [QueueComponent, HeaderIconSectionComponent]
})
export class QueuePageComponent {
	readonly headerIcon = IconQueueComponent;
	readonly queue = inject(QueueService);
	playlistDialogsService = inject(PlaylistDialogsService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event): void {
		this.library.openSimpleMenu([
			{
				text: 'Clear Queue',
				icon: IconRemoveComponent,
				click: (): void => {
					this.queue.clear();
				}
			},
			{
				text: 'Shuffle Queue',
				icon: IconShuffleComponent,
				click: (): void => {
					this.queue.shuffle();
				}
			},
			{
				text: 'Save Queue as Playlist',
				icon: IconPlaylistComponent,
				click: (): void => {
					this.playlistDialogsService.newPlaylist(this.queue.entries);
				}
			}
		], $event);
	}
}
