import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-folders',
	templateUrl: 'folders.component.html',
	styleUrls: ['folders.component.scss']
})
export class FoldersComponent {
	@Input() folders: Array<Jam.Folder>;

	constructor(public navig: NavigService, public player: PlayerService, public actions: ActionsService) {
	}

}
