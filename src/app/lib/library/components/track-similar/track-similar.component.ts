import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { TrackListComponent } from '../track-list/track-list.component';
import { LoadMoreButtonComponent } from '@core/components/load-more-button/load-more-button.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-track-similar',
	templateUrl: './track-similar.component.html',
	styleUrls: ['./track-similar.component.scss'],
	imports: [TrackListComponent, LoadMoreButtonComponent, LoadingComponent]
})
export class TrackSimilarComponent {
	readonly similar = signal<Array<Jam.Track> | undefined>(undefined);
	private id?: string;
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					this.refresh();
				});
		}
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
				if (this.id !== id) {
					return;
				}
				const updated = [...(this.similar() ?? []), ...data.items];
				this.similar.set(updated);
				const loadMore = this.loadMore();
				loadMore.hasMore.set(updated.length < (data.total ?? 0));
				loadMore.total.set(data.total);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.similar.set(undefined);
		this.loadMore().skip.set(0);
		this.loadSimilar();
	}
}
