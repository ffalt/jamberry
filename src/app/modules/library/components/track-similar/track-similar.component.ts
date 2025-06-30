import {Component, OnDestroy, OnInit, inject, viewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {LoadMoreButtonComponent} from '@shared/components';
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
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

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
			skip: this.loadMore().skip(),
			take: this.loadMore().take()
		})
			.then(data => {
				if (this.id === id) {
					this.similar = (this.similar || []).concat(data.items);
					const loadMore = this.loadMore();
					if (loadMore) {
						loadMore.hasMore.set(this.similar.length < (data.total || 0));
						loadMore.total.set(data.total);
					}
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.similar = undefined;
		this.loadMore().skip.set(0);
		this.loadSimilar();
	}

}
