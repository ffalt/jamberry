import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuAlbumComponent} from '../context-menu-album/context-menu-album.component';

@Component({
	selector: 'app-album-card',
	templateUrl: './album-card.component.html',
	styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
	@Input() album: Jam.Album;
	@Input() showArtist: boolean;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuAlbumComponent, this.album, $event);
	}

}
