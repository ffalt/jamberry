import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { type Jam, JamObjectType } from '@jam';
import { JamEpisodeObject, JamTrackObject } from '../../model/objects';
import { AgoPipe } from '@core/pipes/ago.pipe';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { LibraryService } from '../../services/library/library.service';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';

@Component({
	selector: 'app-media-list',
	templateUrl: './media-list.component.html',
	styleUrls: ['./media-list.component.scss'],
	imports: [CommonModule, AgoPipe, DurationPipe, BackgroundTextListComponent, FavIconComponent]
})
export class MediaListComponent {
	readonly entries = input<Array<Jam.MediaBase>>();
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	private readonly player = inject(PlayerService);
	private readonly library = inject(LibraryService);

	onContextMenu($event: Event, item: Jam.MediaBase): void {
		const obj = item.objType === JamObjectType.track ? new JamTrackObject(item as Jam.Track, this.library) : new JamEpisodeObject(item as Jam.Episode, this.library);
		this.library.openJamObjectMenu(obj, $event);
	}

	playTrack(track: Jam.MediaBase): void {
		this.player.startTrack(track);
	}
}
