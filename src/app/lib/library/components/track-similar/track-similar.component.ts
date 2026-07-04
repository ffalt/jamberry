import { Component, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
	private readonly paramMap = toSignal(inject(ActivatedRoute).paramMap);
	private readonly id = computed(() => this.paramMap()?.get('id') ?? undefined);
	private readonly loadMore = viewChild.required(LoadMoreButtonComponent);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			this.id();
			untracked(() => {
				this.similar.set(undefined);
				this.loadMore().skip.set(0);
				this.loadSimilar();
			});
		});
	}

	loadSimilar(): void {
		const id = this.id();
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
				if (this.id() !== id) {
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
}
