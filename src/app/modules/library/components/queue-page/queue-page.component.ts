import {Component} from '@angular/core';
import {QueueService} from '@core/services';
import {LibraryService} from '@library/services';
import {PlaylistDialogsService} from '@shared/services';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent {

	constructor(public queue: QueueService, public playlistDialogsService: PlaylistDialogsService, private library: LibraryService) {
	}

	onContextMenu($event: MouseEvent, item?: any): void {
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
