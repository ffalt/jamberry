import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { IconFavComponent } from '@core/components/icons/icon-fav.component';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-media-playlist-item',
	templateUrl: './media-playlist-item.component.html',
	styleUrls: ['./media-playlist-item.component.scss'],
	imports: [CommonModule, DurationPipe, IconFavComponent]
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
