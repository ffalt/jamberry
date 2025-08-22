import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { JamAlbumObject } from '../../model/objects';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { ActionsService } from '@core/services/actions/actions.service';
import { LibraryService } from '../../services/library/library.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-album-list',
	templateUrl: './album-list.component.html',
	styleUrls: ['./album-list.component.scss'],
	imports: [DurationPipe, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective, BackgroundTextListComponent, FavIconComponent]
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
