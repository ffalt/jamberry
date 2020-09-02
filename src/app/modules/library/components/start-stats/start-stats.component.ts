import {Component, OnInit} from '@angular/core';
import {getTypeByAlbumType} from '@app/utils/jam-lists';
import {NavigService, NotifyService} from '@core/services';
import {AlbumType, JamService} from '@jam';

@Component({
	selector: 'app-start-stats',
	templateUrl: './start-stats.component.html',
	styleUrls: ['./start-stats.component.scss']
})
export class StartStatsComponent implements OnInit {
	stats?: Array<{ text: string; link: string; value: number }>;

	constructor(public jam: JamService, protected notify: NotifyService, public navig: NavigService) {
	}

	ngOnInit(): void {
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
