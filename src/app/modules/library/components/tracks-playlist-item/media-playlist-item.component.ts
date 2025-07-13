import {Component, inject, input} from '@angular/core';
import {NavigService} from '@core/services';
import type {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-playlist-item',
	templateUrl: './media-playlist-item.component.html',
	styleUrls: ['./media-playlist-item.component.scss'],
	standalone: false
})
export class MediaPlaylistItemComponent {
	readonly media = input<Jam.MediaBase>();
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
}
