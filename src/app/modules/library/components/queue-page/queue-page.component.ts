import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {QueueService} from '@core/services';
import {PlaylistDialogsService} from '@shared/services';
import {ContextMenuSimpleComponent, ContextMenuSimpleComponentOptions} from '../context-menu-simple/context-menu-simple.component';

@Component({
	selector: 'app-page-queue',
	templateUrl: './queue-page.component.html',
	styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent {

	constructor(public queue: QueueService, public playlistDialogsService: PlaylistDialogsService, private contextMenuService: ContextMenuService) {
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open<ContextMenuSimpleComponentOptions>(ContextMenuSimpleComponent, item, $event, {
			entries: [
				{
					text: 'Clear Queue',
					icon: 'icon-remove',
					click: () => {
						this.queue.clear();
					}
				},
				{
					text: 'Shuffle Queue',
					icon: 'icon-shuffle',
					click: () => {
						this.queue.shuffle();
					}
				},
				{
					text: 'Save Queue as Playlist',
					icon: 'icon-playlist',
					click: () => {
						this.playlistDialogsService.newPlaylist(this.queue.tracks);
					}
				}
			]
		});
	}

}
