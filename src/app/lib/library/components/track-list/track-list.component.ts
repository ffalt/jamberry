import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { JamTrackObject } from '../../model/objects';
import { AgoPipe } from '@core/pipes/ago.pipe';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { ActionsService } from '@core/services/actions/actions.service';
import { LibraryService } from '../../services/library/library.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss'],
	imports: [CommonModule, AgoPipe, DurationPipe, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective, BackgroundTextListComponent, FavIconComponent]
})
export class TrackListComponent {
	readonly tracks = input<Array<Jam.Track>>();
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	private readonly player = inject(PlayerService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event, item: Jam.Track): void {
		this.library.openJamObjectMenu(new JamTrackObject(item, this.library), $event);
	}

	playTrack(track: Jam.Track): void {
		this.player.startTrack(track);
	}
}
