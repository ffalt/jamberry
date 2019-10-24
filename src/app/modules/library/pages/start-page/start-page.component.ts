import {Component, OnInit} from '@angular/core';
import {JamAlbumTypes} from '@app/utils/jam-lists';
import {NavigService, NotifyService} from '@core/services';
import {AlbumType, JamService} from '@jam';
import {StartSectionItem} from '@library/components';

@Component({
	selector: 'app-page-start',
	templateUrl: 'start-page.component.html',
	styleUrls: ['start-page.component.scss']
})
export class StartPageComponent implements OnInit {
	data: {
		artist_recent?: Array<StartSectionItem>;
		artist_faved?: Array<StartSectionItem>;
		album_faved?: Array<StartSectionItem>;
		album_recent?: Array<StartSectionItem>;
	} = {};
	stats: Array<{ text: string, link: string, value: number }>;

	constructor(public jam: JamService, protected notify: NotifyService, public navig: NavigService) {
	}

	ngOnInit(): void {
		this.jam.artist.list({list: 'recent', amount: 5})
			.then(data => {
				this.data.artist_recent = data.items.map(obj => ({
					obj, click: () => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.artist.list({list: 'faved', amount: 5})
			.then(data => {
				this.data.artist_faved = data.items.map(obj => ({
					obj, click: () => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.list({list: 'faved', amount: 5})
			.then(data => {
				this.data.album_faved = data.items.map(obj => ({
					obj, click: () => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.list({list: 'recent', amount: 5})
			.then(data => {
				this.data.album_recent = data.items.map(obj => ({
					obj, click: () => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});

		this.jam.various.stats({})
			.then(stats => {
				this.stats =
					[
						{text: 'Artists', link: '/library/artists', value: stats.artistTypes.album},
						{text: 'Series', link: '/library/series', value: stats.artistTypes.audiodrama},
						...[
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.album), value: stats.albumTypes.album},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.compilation), value: stats.albumTypes.compilation},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.audiobook), value: stats.albumTypes.audiobook},
							// {albumType: JamAlbumTypes.find(t => t.id === AlbumType.audiodrama), value: stats.albumTypes.audiodrama},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.soundtrack), value: stats.albumTypes.soundtrack},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.live), value: stats.albumTypes.live},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.bootleg), value: stats.albumTypes.bootleg},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.ep), value: stats.albumTypes.ep},
							{albumType: JamAlbumTypes.find(t => t.id === AlbumType.single), value: stats.albumTypes.single}
						].map(t => ({
							text: t.albumType.text, link: '/library/' + t.albumType.link, value: t.value
						})),
						{text: 'Folders', link: '/library/folder-index', value: stats.folder},
						{text: 'Tracks', link: '/library/tracks', value: stats.track}
					].filter(t => t.value > 0);
			})
			.catch(e => {
				this.notify.error(e);
			});

	}

}
