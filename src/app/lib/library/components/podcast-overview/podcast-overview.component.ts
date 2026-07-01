import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import type { Jam } from '@jam';
import { EMPTY, switchMap } from 'rxjs';
import { EpisodeListComponent } from '../episode-list/episode-list.component';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { InfoTextComponent } from '@core/components/info-text/info-text.component';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-podcast-overview',
	templateUrl: './podcast-overview.component.html',
	styleUrls: ['./podcast-overview.component.scss'],
	imports: [EpisodeListComponent, InfoTextComponent]
})
export class PodcastOverviewComponent {
	readonly podcast = signal<Jam.Podcast | undefined>(undefined);
	private id?: string;
	private readonly podcastService = inject(PodcastService);
	private readonly navig = inject(NavigService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(
				takeUntilDestroyed(this.lifeRef),
				switchMap(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					if (!this.id) {
						return EMPTY;
					}
					this.podcastService.refreshPodcast(this.id);
					return this.podcastService.podcastChange.notifier(this.id);
				})
			)
			.subscribe(podcast => {
				if (podcast) {
					this.podcast.set(podcast);
				} else {
					this.navig.toPodcasts();
				}
			});
	}

	refresh(): void {
		if (this.id) {
			this.podcastService.refreshPodcast(this.id);
		}
	}
}
