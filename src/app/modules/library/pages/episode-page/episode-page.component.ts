import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {PodcastService} from '@library/services';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-episode',
	templateUrl: 'episode-page.component.html',
	styleUrls: ['episode-page.component.scss']
})
export class EpisodePageComponent implements OnInit, OnDestroy {
	episode: Jam.PodcastEpisode;
	PodcastStatus = PodcastStatus;
	id: string;
	protected unsubscribe = new Subject();

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
				this.refresh();
			});
		}
		this.podcastService.episodeChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(id => {
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
			this.jam.episode.id({id: this.id, trackTag: true, trackState: true, trackMedia: true})
				.then(episode => {
					this.episode = episode;
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

}