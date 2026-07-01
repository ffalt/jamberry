import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { type Jam, JamService, PodcastStatus } from '@jam';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { PlayerService } from '@core/services/player/player.service';
import { IconDownloadComponent } from '@core/components/icons/icon-download.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { IconWarningComponent } from '@core/components/icons/icon-warning.component';

@Component({
	imports: [IconDownloadComponent, IconPlayComponent, IconSpinComponent, IconWarningComponent],
	selector: 'app-episode-state-button',
	changeDetection: ChangeDetectionStrategy.Eager,
	templateUrl: './episode-state.button.component.html'
})
export class EpisodeStateButtonComponent {
	readonly episode = input<Jam.Episode>();
	readonly showTitle = input<boolean>(false);
	readonly PodcastStatus = PodcastStatus;
	readonly player = inject(PlayerService);
	readonly podcastService = inject(PodcastService);
	readonly jam = inject(JamService);
}
