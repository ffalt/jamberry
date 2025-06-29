import {Component, inject} from '@angular/core';
import {QueueService} from '@core/services';
import {LibraryService} from '@library/services';
import {PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss'],
	standalone: false
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
