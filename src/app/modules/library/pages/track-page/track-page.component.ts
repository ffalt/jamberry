import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {ContextMenuTrackComponent} from '@app/modules/tracks/components';
import {extractSVGParts} from '@app/utils/svg-parts';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Tab} from '@library/components';
import {LoadMoreButtonComponent} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-track',
	templateUrl: 'track-page.component.html',
	styleUrls: ['track-page.component.scss']
})
export class TrackPageComponent implements OnInit, OnDestroy {
	track: Jam.Track;
	similar: Array<Jam.Track>;
	tabs: Array<Tab> = [
		{id: 'overview', name: 'Overview'},
		{id: 'similar', name: 'Similar Tracks'}
	];
	currentTab: Tab = this.tabs[0];
	svg: { viewbox: string; path: string };
	@ViewChild(ContextMenuTrackComponent, {static: true}) trackMenu: ContextMenuTrackComponent;
	@ViewChild(LoadMoreButtonComponent, {static: false}) loadMore: LoadMoreButtonComponent;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute,
		private contextMenuService: ContextMenuService
	) {
	}

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.currentTab = this.tabs[0];
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: MouseEvent, track: Jam.Track): void {
		this.contextMenuService.show.next({contextMenu: this.trackMenu.contextMenu, event: $event, item: track});
		$event.preventDefault();
		$event.stopPropagation();
	}

	setTab(tab: Tab): void {
		this.currentTab = tab;
		if (tab.id === 'similar' && !this.similar) {
			this.loadSimilar();
		} else if (tab.id === 'wave' && !this.svg) {
			this.loadWaveForm();
		}
	}

	loadSimilar(): void {
		const id = this.id;
		this.jam.track.similar({
			id,
			trackState: true,
			trackTag: true,
			offset: this.loadMore.offset,
			amount: this.loadMore.amount
		})
			.then(data => {
				if (this.id === id) {
					this.similar = (this.similar || []).concat(data.items);
					if (this.loadMore) {
						this.loadMore.hasMore = this.similar.length < data.total;
						this.loadMore.total = data.total;
					}
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	load(): void {
		this.jam.track.id({
			id: this.id,
			trackState: true,
			trackTag: true,
			trackMedia: true
		})
			.then(data => {
				this.track = data;
				this.loadWaveForm();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadWaveForm(): void {
		this.jam.media.waveform_binary(this.id, 'svg')
			.then(data => {
				this.svg = extractSVGParts(data);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.track = undefined;
		this.svg = undefined;
		this.similar = undefined;
		if (this.currentTab.id === 'overview') {
			this.load();
		} else {
			this.loadMore.offset = 0;
			this.loadSimilar();
		}
	}

}
