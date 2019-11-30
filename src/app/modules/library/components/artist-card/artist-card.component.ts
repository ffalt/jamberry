import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuArtistComponent} from '../context-menu-artist/context-menu-artist.component';

@Component({
	selector: 'app-artist-card',
	templateUrl: './artist-card.component.html',
	styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
	@Input() artist: Jam.Artist;
	visible: boolean = false;

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
		this.contextMenuService.open(ContextMenuArtistComponent, this.artist, $event);
	}

	gotInView(): void {
		this.visible = true;
	}
}
