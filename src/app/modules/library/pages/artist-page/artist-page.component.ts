import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService} from '@jam';
import {ContextMenuArtistComponent} from '@library/components/context-menu-artist/context-menu-artist.component';
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
	isArtist: boolean = false;
	infos: Array<HeaderInfo> = [];
	tabs: Array<HeaderTab> = [];
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
		this.contextMenuService.open(ContextMenuArtistComponent, this.artist, $event);
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
		this.isArtist = !(artist.albumTypes.length === 1 && artist.albumTypes.includes(AlbumType.series));
		this.infos = [
			{label: 'Albums', value: artist.albumCount},
			{label: 'Tracks', value: artist.trackCount},
			{label: 'Played', value: artist.state.played || 0}
		].filter(info => info.value !== undefined);
		this.tabs = !this.isArtist ? [] :
			[
				{label: 'Overview', link: {route: `/library/artist/${this.id}`, options: {exact: true}}},
				{label: 'Similar Artists', link: {route: `/library/artist/${this.id}/similar`, options: {}}},
				{label: 'MusicBrainz', link: {route: `/library/artist/${this.id}/musicbrainz`, options: {}}}
			];
	}
}
