import { Component, inject } from '@angular/core';
import { QueueComponent } from '../../../player/components/queue/queue.component';
import { PlaylistDialogsService } from '@core/services/playlist-dialogs/playlist-dialogs.service';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { QueueService } from '@core/services/queue/queue.service';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss'],
	imports: [QueueComponent, HeaderIconSectionComponent]
})
export class QueuePageComponent {
	readonly queue = inject(QueueService);
	playlistDialogsService = inject(PlaylistDialogsService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event): void {
		this.library.openSimpleMenu([
			{
				text: 'Clear Queue',
				icon: 'icon-remove',
				click: (): void => {
					this.queue.clear();
				}
			},
			{
				text: 'Shuffle Queue',
				icon: 'icon-shuffle',
				click: (): void => {
					this.queue.shuffle();
				}
			},
			{
				text: 'Save Queue as Playlist',
				icon: 'icon-playlist',
				click: (): void => {
					this.playlistDialogsService.newPlaylist(this.queue.entries);
				}
			}
		], $event);
	}
}
