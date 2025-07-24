import {Component, type OnInit, inject} from '@angular/core';
import {getTypeByAlbumType} from '@app/utils/jam-lists';
import {NotifyService} from '@core/services';
import {AlbumType, type Jam, JamAuthService, JamService} from '@jam';
import {filterStats, type StatsList} from '@shared/components';

@Component({
	selector: 'app-user-stats',
	templateUrl: './user-stats.component.html',
	styleUrls: ['./user-stats.component.scss'],
	standalone: false
})
export class UserStatsComponent implements OnInit {
	base: StatsList = [];
	favorites: StatsList = [];
	played: StatsList = [];
	private readonly jam = inject(JamService);
	private readonly auth = inject(JamAuthService);
	private readonly notify = inject(NotifyService);

	ngOnInit(): void {
		if (this.auth.isLoggedIn()) {
			this.refresh();
		}
	}

	refresh(): void {
		this.jam.stats.user()
			.then(stats => {
				this.favorites = UserStatsComponent.buildStats(stats.favorite, '/favorites');
				this.played = UserStatsComponent.buildStats(stats.played, '/recently-played');
				this.base = filterStats([
					{text: 'Bookmarks', link: '/library/bookmarks', value: stats.bookmark},
					{text: 'Playlists', link: '/library/playlists', value: stats.playlist}
				], true);
			})
			.catch(error => this.notify.error(error));

	}

	private static buildStats(detail: Jam.UserDetailStats, suffix: string = ''): StatsList {
		return filterStats([
				{text: 'Artists', link: 'artists', value: detail.artistTypes.album},
				...[
					{type: getTypeByAlbumType(AlbumType.album), value: detail.albumTypes.album},
					{type: getTypeByAlbumType(AlbumType.compilation), value: detail.albumTypes.compilation}
				].map(t => ({
					text: t.type?.text, link: `${t.type?.id}`, value: t.value
				})),
				{text: 'Series', link: 'series', value: detail.series},
				...[
					{type: getTypeByAlbumType(AlbumType.audiobook), value: detail.albumTypes.audiobook},
					{type: getTypeByAlbumType(AlbumType.soundtrack), value: detail.albumTypes.soundtrack},
					{type: getTypeByAlbumType(AlbumType.live), value: detail.albumTypes.live},
					{type: getTypeByAlbumType(AlbumType.bootleg), value: detail.albumTypes.bootleg},
					{type: getTypeByAlbumType(AlbumType.ep), value: detail.albumTypes.ep},
					{type: getTypeByAlbumType(AlbumType.single), value: detail.albumTypes.single}
				].map(t => ({
					text: t.type?.text, link: `${t.type?.id}`, value: t.value
				})),
				{text: 'Folders', link: 'folders', value: detail.folder},
				{text: 'Tracks', link: 'tracks', value: detail.track}
			].map(o => ({...o, link: `/library/${o.link}${suffix}`}))
		);
	}
}
