import { Component, inject, type OnDestroy, type OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { TrackListComponent } from '../track-list/track-list.component';
import { LoadMoreButtonComponent } from '@core/components/load-more-button/load-more-button.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-track-similar',
	templateUrl: './track-similar.component.html',
	styleUrls: ['./track-similar.component.scss'],
	imports: [TrackListComponent, LoadMoreButtonComponent, LoadingComponent]
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
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
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
					this.similar = [...(this.similar ?? []), ...data.items];
					const loadMore = this.loadMore();
					loadMore.hasMore.set(this.similar.length < (data.total ?? 0));
					loadMore.total.set(data.total);
				}
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.similar = undefined;
		this.loadMore().skip.set(0);
		this.loadSimilar();
	}
}
