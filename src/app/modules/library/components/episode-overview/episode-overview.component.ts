import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-episode-overview',
	templateUrl: './episode-overview.component.html',
	styleUrls: ['./episode-overview.component.scss'],
	standalone: false
})
export class EpisodeOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	episode?: Jam.Episode;
	readonly podcastService = inject(PodcastService);
	readonly navig = inject(NavigService);
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
	readonly jam = inject(JamService);
	protected readonly notify = inject(NotifyService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly unsubscribe = new Subject<void>();

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
			this.jam.episode.id({id: this.id, episodeIncTag: true, episodeIncState: true, episodeIncMedia: true})
				.then(episode => {
					this.display(episode);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	display(episode: Jam.Episode): void {
		this.episode = episode;
	}
}
