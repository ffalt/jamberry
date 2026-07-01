import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { JamAlbumObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { LibraryService } from '../../services/library/library.service';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-series-overview',
	templateUrl: './series-overview.component.html',
	styleUrls: ['./series-overview.component.scss'],
	imports: [ObjGroupsViewComponent, LoadingComponent]
})
export class SeriesOverviewComponent {
	readonly series = signal<Jam.Series | undefined>(undefined);
	readonly albums = computed(() => {
		const s = this.series();
		return s ? (s.albums ?? []).map(a => new JamAlbumObject(a, this.library)) : undefined;
	});

	private id?: string;
	private readonly library = inject(LibraryService);
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	refresh(): void {
		this.series.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.series.id({ id: this.id, seriesIncState: true, seriesIncAlbums: true, albumIncState: true })
			.then(series => {
				this.series.set(series);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
