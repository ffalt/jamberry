import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {PodcastService} from '@shared/services';
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
	private readonly podcastService = inject(PodcastService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

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
