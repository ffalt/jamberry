import {Component, OnInit} from '@angular/core';
import {getTypeByAlbumType} from '@app/utils/jam-lists';
import {NavigService, NotifyService} from '@core/services';
import {AlbumType, JamService, ListType} from '@jam';
import {StartSectionItem} from '@library/components';

@Component({
	selector: 'app-page-start',
	templateUrl: './start-page.component.html',
	styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
	data: {
		artistRecent?: Array<StartSectionItem>;
		artistFaved?: Array<StartSectionItem>;
		albumFaved?: Array<StartSectionItem>;
		albumRecent?: Array<StartSectionItem>;
	} = {};
	stats?: Array<{ text: string; link: string; value: number }>;

	constructor(public jam: JamService, protected notify: NotifyService, public navig: NavigService) {
	}

	ngOnInit(): void {
		this.jam.artist.search({list: ListType.recent, take: 5})
			.then(data => {
				this.data.artistRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.artist.search({list: ListType.faved, take: 5})
			.then(data => {
				this.data.artistFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.search({list: ListType.faved, take: 5})
			.then(data => {
				this.data.albumFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.search({list: ListType.recent, take: 5})
			.then(data => {
				this.data.albumRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});

		this.jam.stats.get({})
			.then(stats => {
				this.stats =
					[
						{text: 'Artists', link: '/library/artists', value: stats.artistTypes.album},
						...[
							{type: getTypeByAlbumType(AlbumType.album), value: stats.albumTypes.album},
							{type: getTypeByAlbumType(AlbumType.compilation), value: stats.albumTypes.compilation}
						].map(t => ({
							text: t.type?.text, link: `/library/${t.type?.id}`, value: t.value
						})),
						{text: 'Series', link: '/library/series', value: stats.series},
						...[
							{type: getTypeByAlbumType(AlbumType.audiobook), value: stats.albumTypes.audiobook},
							{type: getTypeByAlbumType(AlbumType.soundtrack), value: stats.albumTypes.soundtrack},
							{type: getTypeByAlbumType(AlbumType.live), value: stats.albumTypes.live},
							{type: getTypeByAlbumType(AlbumType.bootleg), value: stats.albumTypes.bootleg},
							{type: getTypeByAlbumType(AlbumType.ep), value: stats.albumTypes.ep},
							{type: getTypeByAlbumType(AlbumType.single), value: stats.albumTypes.single}
						].map(t => ({
							text: t.type?.text, link: `/library/${t.type?.id}`, value: t.value
						})),
						{text: 'Folders', link: '/library/folders', value: stats.folder},
						{text: 'Tracks', link: '/library/tracks', value: stats.track}
					].filter(t => t.value > 0 && t.text) as Array<{ text: string; link: string; value: number }>;
			})
			.catch(e => {
				this.notify.error(e);
			});

	}

}
