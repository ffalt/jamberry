import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Jam } from '@jam';
import { Subject, type Subscription, takeUntil } from 'rxjs';
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
export class PodcastOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	podcast?: Jam.Podcast;
	private readonly podcastService = inject(PodcastService);
	private readonly navig = inject(NavigService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private podcastID?: string;
	private subList?: Subscription;

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.recheck();
			});
	}

	ngOnDestroy(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	recheck(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		if (this.id) {
			this.podcastID = this.id;
			this.subList = this.podcastService.podcastChange
				.notifier(this.podcastID)
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(podcast => {
					if (podcast) {
						this.podcast = podcast;
					} else {
						this.navig.toPodcasts();
					}
				});
			this.refresh();
		}
	}

	refresh(): void {
		if (this.podcastID) {
			this.podcastService.refreshPodcast(this.podcastID);
		}
	}
}
