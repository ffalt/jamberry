import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuObjComponent} from '@library/components/context-menu-obj/context-menu-obj.component';
import {JamAlbumObject, JamSeriesObject} from '@library/model/helper';
import {LibraryService} from '@library/services';
import {HeaderInfo} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-series-id',
	templateUrl: './series-id-page.component.html',
	styleUrls: ['./series-id-page.component.scss']
})
export class SeriesIdPageComponent implements OnInit, OnDestroy {
	series: Jam.Series;
	albums: Array<JamAlbumObject>;
	infos: Array<HeaderInfo> = [];
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		private library: LibraryService, public player: PlayerService,
		private jam: JamService, private notify: NotifyService, private route: ActivatedRoute,
		private contextMenuService: ContextMenuService
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

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuObjComponent, new JamSeriesObject(this.series, this.library), $event);
	}

	refresh(): void {
		this.series = undefined;
		if (!this.id) {
			return;
		}
		this.jam.series.id({id: this.id, seriesState: true, seriesAlbums: true, albumState: true, albumTag: true})
			.then(artist => {
				this.display(artist);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	display(series: Jam.Series): void {
		this.series = series;
		this.albums = (series.albums || []).map(s => new JamAlbumObject(s, this.library));
		this.infos = [
			{label: 'Albums', value: series.albumCount},
			{label: 'Tracks', value: series.trackCount},
			{label: 'Played', value: series.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}
