import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-podcast-overview',
	templateUrl: './podcast-overview.component.html',
	styleUrls: ['./podcast-overview.component.scss']
})
export class PodcastOverviewComponent implements OnInit, OnDestroy {
	podcast: Jam.Podcast;
	id: string;
	protected unsubscribe = new Subject();
	private subList: Subscription;
	private podcastID: string;

	constructor(
		public podcastService: PodcastService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
	}

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
