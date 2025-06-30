import {Component, inject, input} from '@angular/core';
import {NavigService} from '@core/services';
import {Jam} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {ActionsService} from '@shared/services';
import {LibraryService} from '../../services';

@Component({
	selector: 'app-album-list',
	templateUrl: './album-list.component.html',
	styleUrls: ['./album-list.component.scss'],
	standalone: false
})
export class AlbumListComponent {
	readonly albums = input<Array<Jam.Album>>();
	readonly showArtist = input<boolean>(false);
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event, item: Jam.Album): void {
		this.library.openJamObjectMenu(new JamAlbumObject(item, this.library), $event);
	}
}
