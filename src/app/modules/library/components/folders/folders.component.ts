import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuFolderComponent} from '../context-menu-folder/context-menu-folder.component';

@Component({
	selector: 'app-folders',
	templateUrl: 'folders.component.html',
	styleUrls: ['folders.component.scss']
})
export class FoldersComponent {
	@Input() folders: Array<Jam.Folder>;

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private contextMenuService: ContextMenuService) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Folder): void {
		this.contextMenuService.open(ContextMenuFolderComponent, item, $event);
	}
}
