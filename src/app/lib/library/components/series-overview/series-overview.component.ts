import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
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
export class SeriesOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	series?: Jam.Series;
	albums?: Array<JamAlbumObject>;
	private readonly library = inject(LibraryService);
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.series = undefined;
		this.albums = undefined;
		if (!this.id) {
			return;
		}
		this.jam.series.id({ id: this.id, seriesIncState: true, seriesIncAlbums: true, albumIncState: true })
			.then(series => {
				this.display(series);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	display(series: Jam.Series): void {
		this.series = series;
		this.albums = (series.albums ?? []).map(s => new JamAlbumObject(s, this.library));
	}
}
