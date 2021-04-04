import {Injectable} from '@angular/core';
import {Route, Router} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {JamService} from '@jam';
import {
	AlbumsLoader,
	ArtistsLoader,
	FoldersLoader,
	GenresLoader,
	PlaylistsLoader,
	PodcastsLoader,
	SeriesLoader
} from '@library/model/loaders';
import {HeaderTab} from '@shared/components';
import {ActionsService, PlaylistDialogsService, PodcastService} from '@shared/services';

@Injectable()
export class LibraryService {
	folderLoader = new FoldersLoader(this);
	albumLoader = new AlbumsLoader(this);
	artistLoader = new ArtistsLoader(this);
	genreLoader = new GenresLoader(this);
	playlistLoader = new PlaylistsLoader(this);
	podcastLoader = new PodcastsLoader(this);
	seriesLoader = new SeriesLoader(this);

	constructor(
		public navig: NavigService, public actions: ActionsService,
		public player: PlayerService, public contextMenuService: ContextMenuService,
		public jam: JamService, public notify: NotifyService,
		public playlistDialogsService: PlaylistDialogsService,
		public podcastService: PodcastService,
		private router: Router
	) {
	}

	buildTabs(section: string): Array<HeaderTab> {
		const lib: any = this.router.config.find(r => r.path === 'library');
		// eslint-disable-next-line no-underscore-dangle
		if (lib && lib._loadedConfig && lib._loadedConfig.routes) {
			// eslint-disable-next-line no-underscore-dangle
			const tabSection = lib._loadedConfig.routes[0].children.find((r: Route) => r.path === section);
			if (tabSection) {
				return tabSection.children
					.filter((r: Route) => !!r.data)
					.map((r: Route) =>
						({
							label: r.data?.name,
							link: {route: `/library/${section}${r.path ? '/' : ''}${r.path}`, exact: r.path?.length === 0}
						}));
			}
		}
		return [];
	}

	buildIDTabs(section: string, id: string): Array<HeaderTab> {
		const lib: any = this.router.config.find(r => r.path === 'library');
		// eslint-disable-next-line no-underscore-dangle
		if (lib && lib._loadedConfig && lib._loadedConfig.routes) {
			// eslint-disable-next-line no-underscore-dangle
			const tabSection = lib._loadedConfig.routes[0].children
				.find((r: Route) => r.path === `${section}/id/:id`);
			if (tabSection) {
				return tabSection.children
					.filter((r: Route) => !!r.data)
					.map((r: Route) =>
						({
							label: r.data?.name,
							link: {route: `/library/${section}/id/${id}${r.path ? '/' : ''}${r.path}`, exact: r.path?.length === 0}
						}));
			}
		}
		return [];
	}
}
