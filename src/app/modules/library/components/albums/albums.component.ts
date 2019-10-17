import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuAlbumComponent} from '../context-menu-album/context-menu-album.component';

@Component({
	selector: 'app-albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.scss']
})
export class AlbumsComponent implements OnChanges {
	@Input() albums: Array<Jam.Album>;
	@Input() showArtist: boolean = false;
	@Input() viewTypeList: boolean = false;
	@Input() grouping: boolean = true;
	@Input() limitArtist: Jam.Artist;
	@Input() typeName: string;
	@Input() headline: string;
	groups: Array<{ type: string; albums: Array<Jam.Album>; }>;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Album): void {
		this.contextMenuService.open(ContextMenuAlbumComponent, item, $event);
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.groups = undefined;
		if (this.albums) {
			if (!this.grouping) {
				if (this.albums.length > 0) {
					this.groups = [{type: undefined, albums: this.albums}];
				}
				return;
			}
			const groups = [];
			for (const album of this.albums) {
				let group = groups.find(g => g.type === album.albumType);
				if (!group) {
					group = {type: album.albumType, albums: []};
					groups.push(group);
				}
				group.albums.push(album);
			}
			if (groups.length > 0) {
				this.groups = groups;
			}
		}
	}

}
