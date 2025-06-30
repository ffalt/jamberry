import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService} from '@core/services';
import {Jam} from '@jam';
import {PodcastService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-podcast-overview',
	templateUrl: './podcast-overview.component.html',
	styleUrls: ['./podcast-overview.component.scss'],
	standalone: false
})
export class PodcastOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	podcast?: Jam.Podcast;
	private podcastID?: string;
	private subList?: Subscription;
	private readonly podcastService = inject(PodcastService);
	private readonly navig = inject(NavigService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.recheck();
			});
		}
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
				.pipe(takeUntil(this.unsubscribe)).subscribe(podcast => {
					if (!podcast) {
						this.navig.toPodcasts();
						return;
					}
					this.podcast = podcast;
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
