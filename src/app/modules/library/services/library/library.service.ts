import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {JamService} from '@jam';
import {
	AlbumsLoader,
	ArtistsLoader,
	EpisodesLoader,
	FoldersLoader,
	PlaylistsLoader,
	PodcastsLoader,
	SeriesLoader
} from '@library/model/helper';
import {HeaderTab} from '@shared/components';
import {ActionsService, PlaylistDialogsService} from '@shared/services';

@Injectable()
export class LibraryService {
	folderLoader = new FoldersLoader(this);
	albumLoader = new AlbumsLoader(this);
	artistLoader = new ArtistsLoader(this);
	playlistLoader = new PlaylistsLoader(this);
	episodeLoader = new EpisodesLoader(this);
	podcastLoader = new PodcastsLoader(this);
	seriesLoader = new SeriesLoader(this);

	constructor(
		public navig: NavigService, public actions: ActionsService,
		public player: PlayerService, public contextMenuService: ContextMenuService,
		public jam: JamService, public notify: NotifyService,
		public playlistDialogsService: PlaylistDialogsService,
		private router: Router
	) {
	}

	buildTabs(section: string): Array<HeaderTab> {
		const lib: any = this.router.config.find(r => r.path === 'library');
		if (lib && lib._loadedConfig && lib._loadedConfig.routes) {
			const tabSection = lib._loadedConfig.routes[0].children.find(r => r.path === section);
			if (tabSection) {
				const result = tabSection.children.filter(r => !!r.data).map(r => {
					return {
						label: r.data.name,
						link: {route: `/library/${section}${r.path ? '/' : ''}${r.path}`, exact: r.path.length === 0}
					};
				});
				return result;
			}
		}
		return [];
	}
}
