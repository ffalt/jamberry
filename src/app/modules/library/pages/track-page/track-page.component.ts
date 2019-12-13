import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuTrackComponent, ContextMenuTrackComponentOptions} from '@library/components';
import {HeaderInfo, HeaderTab} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-track',
	templateUrl: './track-page.component.html',
	styleUrls: ['./track-page.component.scss']
})
export class TrackPageComponent implements OnInit, OnDestroy {
	track: Jam.Track;
	infos: Array<HeaderInfo> = [];
	tabs: Array<HeaderTab>;
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
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open<ContextMenuTrackComponentOptions>(ContextMenuTrackComponent, this.track, $event, {showGoTo: false});
	}

	load(): void {
		this.jam.track.id({
			id: this.id,
			trackState: true,
			trackTag: true
		})
			.then(track => {
				this.display(track);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.track = undefined;
		this.tabs = [
			{label: 'Overview', link: {route: `/library/tracks/id/${this.id}`, exact: true}},
			{label: 'Similar Tracks', link: {route: `/library/tracks/id/${this.id}/similar`}}
		];
		this.load();
	}

	display(track: Jam.Track): void {
		this.track = track;
		this.infos = [
			{
				label: 'Artist', value: track.tag.artist, click: () => {
					this.navig.toArtistID(track.artistID, track.tag.artist);
				}
			},
			{
				label: 'Album', value: track.tag.album, click: () => {
					this.navig.toAlbumID(track.albumID, track.tag.album);
				}
			},
			{label: 'Played', value: track.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}
