import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ContextMenuArtistComponent} from '@library/components/context-menu-artist/context-menu-artist.component';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-artist',
	templateUrl: 'artist.component.html',
	styleUrls: ['artist.component.scss']
})
export class ArtistComponent {
	@Input() artist: Jam.Artist;
	@ViewChild(ContextMenuArtistComponent, {static: true}) artistMenu: ContextMenuArtistComponent;

	constructor(
		public player: PlayerService, public actions: ActionsService, public navig: NavigService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Artist): void {
		this.contextMenuService.show.next({contextMenu: this.artistMenu.contextMenu, event: $event, item});
		$event.preventDefault();
		$event.stopPropagation();
	}

}
