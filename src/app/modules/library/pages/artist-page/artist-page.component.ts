import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService} from '@jam';
import {ContextMenuObjComponent} from '@library/components';
import {JamArtistObject} from '@library/model/helper';
import {LibraryService} from '@library/services';
import {HeaderInfo, HeaderTab} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-artist',
	templateUrl: './artist-page.component.html',
	styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit, OnDestroy {
	AlbumType = AlbumType;
	artist: Jam.Artist;
	infos: Array<HeaderInfo> = [];
	tabs: Array<HeaderTab> = [];
	id: string;
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
		this.contextMenuService.open(ContextMenuObjComponent, new JamArtistObject(this.artist, this.library), $event);
	}

	refresh(): void {
		this.artist = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.id({id: this.id, artistState: true})
			.then(artist => {
				this.display(artist);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	display(artist: Jam.Artist): void {
		this.artist = artist;
		this.infos = [
			{label: 'Albums', value: artist.albumCount},
			{label: 'Tracks', value: artist.trackCount},
			{label: 'Played', value: artist.state.played || 0}
		].filter(info => info.value !== undefined);
		this.tabs =
			[
				{label: 'Overview', link: {route: `/library/artists/id/${this.id}`, exact: true}},
				{label: 'Similar Artists', link: {route: `/library/artists/id/${this.id}/similar`}},
				{label: 'MusicBrainz', link: {route: `/library/artists/id/${this.id}/musicbrainz`}}
			];
	}
}
