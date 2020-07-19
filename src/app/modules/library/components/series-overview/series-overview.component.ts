import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-overview',
	templateUrl: './series-overview.component.html',
	styleUrls: ['./series-overview.component.scss']
})
export class SeriesOverviewComponent implements OnInit, OnDestroy {
	series: Jam.Series;
	albums: Array<JamAlbumObject>;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected library: LibraryService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService,
		protected route: ActivatedRoute
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
		this.jam.series.id({id: this.id, seriesIncState: true, seriesIncAlbums: true, albumIncState: true})
			.then(series => {
				this.display(series);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	display(series: Jam.Series): void {
		this.series = series;
		this.albums = (series.albums || []).map(s => new JamAlbumObject(s, this.library));
	}
}
