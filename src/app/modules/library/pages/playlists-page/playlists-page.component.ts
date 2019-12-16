import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {ContextMenuPlaylistsComponent} from '@library/components';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-playlists',
	templateUrl: './playlists-page.component.html',
	styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent {
	tabs: Array<HeaderTab>;

	constructor(private contextMenuService: ContextMenuService, private library: LibraryService) {
		this.tabs = this.library.buildTabs('playlists');
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open(ContextMenuPlaylistsComponent, item, $event);
	}
}
