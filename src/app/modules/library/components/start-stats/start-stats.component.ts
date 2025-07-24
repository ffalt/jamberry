import {Component, type OnInit, inject} from '@angular/core';
import {getTypeByAlbumType} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {AlbumType, JamService} from '@jam';
import {filterStats, type StatsList} from '@shared/components';

@Component({
	selector: 'app-start-stats',
	templateUrl: './start-stats.component.html',
	styleUrls: ['./start-stats.component.scss'],
	standalone: false
})
export class StartStatsComponent implements OnInit {
	stats?: StatsList;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnInit(): void {
		this.jam.stats.get({})
			.then(stats => {
				this.stats = filterStats(
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
					]);
			})
			.catch(error => this.notify.error(error));
	}
}
