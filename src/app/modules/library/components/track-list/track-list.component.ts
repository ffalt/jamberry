import {Component, inject, input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import type {Jam} from '@jam';
import {JamTrackObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-track-list',
	templateUrl: './track-list.component.html',
	styleUrls: ['./track-list.component.scss'],
	standalone: false
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
