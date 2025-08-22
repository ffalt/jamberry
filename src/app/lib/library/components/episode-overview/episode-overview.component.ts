import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
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
export class EpisodeOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	episode?: Jam.Episode;
	private readonly podcastService = inject(PodcastService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
		this.podcastService.episodeChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(id => {
				if (id === this.id) {
					this.refresh();
				}
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		if (this.id) {
			this.jam.episode.id({ id: this.id, episodeIncTag: true, episodeIncState: true, episodeIncMedia: true })
				.then(episode => {
					this.display(episode);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	display(episode: Jam.Episode): void {
		this.episode = episode;
	}
}
