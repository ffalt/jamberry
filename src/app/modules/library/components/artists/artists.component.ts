import {Component, Input, ViewChild} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ContextMenuArtistComponent} from '@library/components/context-menu-artist/context-menu-artist.component';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-artists',
	templateUrl: 'artists.component.html',
	styleUrls: ['artists.component.scss']
})
export class ArtistsComponent {
	@Input() artists: Array<Jam.Artist>;
	@Input() viewTypeList: boolean = false;
	@ViewChild(ContextMenuArtistComponent, {static: true}) artistMenu: ContextMenuArtistComponent;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Artist): void {
		this.contextMenuService.show.next({contextMenu: this.artistMenu.contextMenu, event: $event, item});
		$event.preventDefault();
		$event.stopPropagation();
	}

}
