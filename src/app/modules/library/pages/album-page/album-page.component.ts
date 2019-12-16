import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuObjComponent} from '@library/components';
import {JamAlbumObject} from '@library/model/helper';
import {LibraryService} from '@library/services';
import {HeaderInfo, HeaderTab} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-album',
	templateUrl: './album-page.component.html',
	styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit, OnDestroy {
	album: Jam.Album;
	infos: Array<HeaderInfo> = [];
	id: string;
	tabs: Array<HeaderTab> = [];
	protected unsubscribe = new Subject();

	constructor(
		private library: LibraryService,
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
		this.contextMenuService.open(ContextMenuObjComponent, new JamAlbumObject(this.album, this.library), $event);
	}

	display(album: Jam.Album): void {
		this.album = album;
		this.infos = [
			{
				label: 'Artist', value: album.artist, click: () => {
					this.navig.toArtistID(album.artistID, album.artist);
				}
			},
			{label: 'Year', value: album.tag.year},
			{label: 'Played', value: album.state.played || 0}
		].filter(info => info.value !== undefined);
		this.tabs = album && album.tag && album.tag.musicbrainz && album.tag.musicbrainz.albumID ?
			[
				{label: 'Overview', link: {route: `/library/albums/id/${this.id}`, exact: true}},
				{label: 'MusicBrainz', link: {route: `/library/albums/id/${this.id}/musicbrainz`}}
			] : [];
	}

	refresh(): void {
		this.album = undefined;
		if (this.id) {
			this.jam.album.id({id: this.id, albumState: true, albumTag: true})
				.then(album => {
					this.display(album);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

}
