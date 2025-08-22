import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-media-playlist-item',
	templateUrl: './media-playlist-item.component.html',
	styleUrls: ['./media-playlist-item.component.scss'],
	imports: [CommonModule, DurationPipe, FavIconComponent]
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
