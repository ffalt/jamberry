import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuSeriesComponent} from '@library/components/context-menu-series/context-menu-series.component';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-series-plate',
	templateUrl: './series-plate.component.html',
	styleUrls: ['./series-plate.component.scss']
})
export class SeriesPlateComponent {
	@Input() series: Jam.Series;
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
		this.contextMenuService.open(ContextMenuSeriesComponent, this.series, $event);
	}

	toggleSeriesAlbums(): void {
		this.albumsExpanded = !this.albumsExpanded;
		if (this.series) {
			const id = this.series.id;
			this.jam.series.albums({ids: [id], albumState: true, albumTag: true})
				.then(data => {
					if (this.series && this.series.id === id) {
						this.albums = data.items;
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}
}
