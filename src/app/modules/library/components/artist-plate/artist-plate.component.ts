import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuArtistComponent} from '@library/components/context-menu-artist/context-menu-artist.component';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-artist-plate',
	templateUrl: './artist-plate.component.html',
	styleUrls: ['./artist-plate.component.scss']
})
export class ArtistPlateComponent {
	@Input() artist: Jam.Artist;
	albums: Array<Jam.Album>;
	albumsExpanded: boolean = false;

	constructor(
		public player: PlayerService, public actions: ActionsService, public navig: NavigService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuArtistComponent, this.artist, $event);
	}

	toggleArtistAlbums(): void {
		this.albumsExpanded = !this.albumsExpanded;
		if (this.artist) {
			const id = this.artist.id;
			this.jam.artist.albums({ids: [id], albumState: true})
				.then(data => {
					if (this.artist && this.artist.id === id) {
						this.albums = data.items;
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}
}
