import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {FolderType, Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuFolderComponent} from '../context-menu-folder/context-menu-folder.component';

export function getFolderTypeInfo(folder: Jam.Folder): { type?: string; name?: string; year?: string } {
	if (folder) {
		switch (folder.type as FolderType) {
			case FolderType.album:
			case FolderType.multialbum:
				return {
					type: 'Album',
					name: folder.tag.album,
					year: folder.tag.year !== undefined ? folder.tag.year.toString() : undefined
				};
			case FolderType.collection:
				return {
					type: 'Collection',
					name: folder.name
				};
			case FolderType.artist:
				return {
					type: 'Artist',
					name: folder.tag.artist
				};
			default:
				return {
					type: folder.type,
					name: folder.name
				};
		}
	}
	return {};
}

@Component({
	selector: 'app-folder-plate',
	templateUrl: './folder-plate.component.html',
	styleUrls: ['./folder-plate.component.scss']
})
export class FolderPlateComponent implements OnChanges {
	showTracks: boolean = true;
	tracks: Array<Jam.Track>;
	tracksExpanded: boolean = false;
	showArtist: boolean = false;
	headline: { type?: string; name?: string; year?: string } = {};
	@Input() folder: Jam.Folder;

	constructor(
		public navig: NavigService, public player: PlayerService, private jam: JamService, private notify: NotifyService,
		private contextMenuService: ContextMenuService, public actions: ActionsService) {
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuFolderComponent, this.folder, $event);
	}

	toggleFolderTracks(): void {
		this.tracksExpanded = !this.tracksExpanded;
		if (!this.tracks) {
			const id = this.folder.id;
			this.jam.folder.tracks({ids: [id], trackTag: true, trackState: true})
				.then(data => {
					if (this.folder && this.folder.id === id) {
						this.tracks = data.items;
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.tracksExpanded = false;
		this.tracks = undefined;
		this.headline = getFolderTypeInfo(this.folder);
	}

}
