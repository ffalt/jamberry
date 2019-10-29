import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuFolderComponent} from '../context-menu-folder/context-menu-folder.component';

@Component({
	selector: 'app-folder-card',
	templateUrl: './folder-card.component.html',
	styleUrls: ['./folder-card.component.scss']
})
export class FolderCardComponent {
	@Input() folder: Jam.Folder;

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
		this.contextMenuService.open(ContextMenuFolderComponent, this.folder, $event);
	}

}
