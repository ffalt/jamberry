import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {JamLists} from '@app/utils/jam-lists';
import {ContextMenuPlaylistsComponent} from '@library/components';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-playlists',
	templateUrl: './playlists-page.component.html',
	styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent {
	tabs: Array<HeaderTab> = [
		{label: 'Index', link: {route: '/library/playlists', options: {exact: true}}},
		...JamLists.map(list => (
			{label: list.text, link: {route: `/library/playlists/${list.link}`, options: {}}}
		))
	];

	constructor(private contextMenuService: ContextMenuService) {
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open(ContextMenuPlaylistsComponent, item, $event);
	}
}
