import {Component, OnDestroy, OnInit, ViewChild, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-track-similar',
	templateUrl: './track-similar.component.html',
	styleUrls: ['./track-similar.component.scss'],
	standalone: false
})
export class TrackSimilarComponent implements OnInit, OnDestroy {
	id?: string;
	similar?: Array<Jam.Track>;
	@ViewChild(LoadMoreButtonComponent, {static: true}) loadMore!: LoadMoreButtonComponent;
	readonly navig = inject(NavigService);
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
	protected readonly jam = inject(JamService);
	protected readonly notify = inject(NotifyService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.parent.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	loadSimilar(): void {
		const id = this.id;
		if (!id) {
			return;
		}
		this.jam.track.similar({
			id,
			trackIncState: true,
			trackIncTag: true,
			skip: this.loadMore.skip,
			take: this.loadMore.take
		})
			.then(data => {
				if (this.id === id) {
					this.similar = (this.similar || []).concat(data.items);
					if (this.loadMore) {
						this.loadMore.hasMore = this.similar.length < (data.total || 0);
						this.loadMore.total = data.total;
					}
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.similar = undefined;
		this.loadMore.skip = 0;
		this.loadSimilar();
	}

}
