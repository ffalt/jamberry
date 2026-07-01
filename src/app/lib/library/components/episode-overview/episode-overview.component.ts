import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { FilesizePipe } from '@core/pipes/filesize.pipe';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { ChaptersComponent } from '@core/components/chapters/chapters.component';
import { InfoTextComponent } from '@core/components/info-text/info-text.component';

@Component({
	selector: 'app-episode-overview',
	templateUrl: './episode-overview.component.html',
	styleUrls: ['./episode-overview.component.scss'],
	imports: [CommonModule, DurationPipe, FilesizePipe, ChaptersComponent, InfoTextComponent]
})
export class EpisodeOverviewComponent {
	readonly episode = signal<Jam.Episode | undefined>(undefined);
	private id?: string;
	private readonly podcastService = inject(PodcastService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
		this.podcastService.episodeChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(id => {
				if (id === this.id) {
					this.refresh();
				}
			});
	}

	refresh(): void {
		if (!this.id) {
			return;
		}
		this.jam.episode.id({ id: this.id, episodeIncTag: true, episodeIncState: true, episodeIncMedia: true })
			.then(episode => {
				this.episode.set(episode);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
