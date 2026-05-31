import { Component, input } from '@angular/core';
import { IconCheckmarkComponent } from '@core/components/icons/icon-checkmark.component';
import { IconClockComponent } from '@core/components/icons/icon-clock.component';
import { IconHeadphonesComponent } from '@core/components/icons/icon-headphones.component';
import { IconHeartEmptyComponent } from '@core/components/icons/icon-heart-empty.component';
import { IconStopwatchComponent } from '@core/components/icons/icon-stopwatch.component';

@Component({
	imports: [IconCheckmarkComponent, IconClockComponent, IconHeadphonesComponent, IconHeartEmptyComponent, IconStopwatchComponent],
	selector: 'app-media-playlist-header',
	templateUrl: './media-playlist-header.component.html',
	styleUrls: ['./media-playlist-header.component.scss']
})
export class MediaPlaylistHeaderComponent {
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
}
