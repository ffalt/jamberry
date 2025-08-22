import { inject, Injectable } from '@angular/core';
import type { Route } from '@angular/router';
import { JamService } from '@jam';
import type { LinkRoute } from '../../../../../@types/link-route';
import { routes } from '../../../../app.routing';
import { ContextMenuObjComponent, type ContextMenuObjComponentOptions } from '../../components/context-menu-obj/context-menu-obj.component';
import { ContextMenuSimpleComponent, type ContextMenuSimpleComponentOptions } from '../../components/context-menu-simple/context-menu-simple.component';
import { AlbumsLoader, ArtistsLoader, FoldersLoader, GenresLoader, PlaylistsLoader, PodcastsLoader, SeriesLoader } from '../../model/loaders';
import type { JamLibraryObject } from '../../model/objects';
import { ActionsService } from '@core/services/actions/actions.service';
import { PlaylistDialogsService } from '@core/services/playlist-dialogs/playlist-dialogs.service';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { MenuService } from '@core/services/contextmenu/menu.service';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { PlayerService } from '@core/services/player/player.service';
import { NavigService } from '@core/services/navig/navig.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Injectable({
	providedIn: 'root'
})
export class LibraryService {
	readonly actions = inject(ActionsService);
	readonly player = inject(PlayerService);
	readonly playlistDialogsService = inject(PlaylistDialogsService);
	readonly navig = inject(NavigService);
	readonly jam = inject(JamService);
	readonly notify = inject(NotifyService);
	readonly podcastService = inject(PodcastService);
	folderLoader = new FoldersLoader(this);
	albumLoader = new AlbumsLoader(this);
	artistLoader = new ArtistsLoader(this);
	genreLoader = new GenresLoader(this);
	playlistLoader = new PlaylistsLoader(this);
	podcastLoader = new PodcastsLoader(this);
	seriesLoader = new SeriesLoader(this);
	private readonly menuService = inject(MenuService);

	buildTabs(section: string): Array<HeaderTab> {
		const libRoutes = routes.find(r => r.path === 'library')!;
		const tabSection = libRoutes.children?.find((r: Route) => r.path === section);
		if (tabSection?.children) {
			return tabSection.children
				.filter((r: Route) => !!r.data)
				.map((r: LinkRoute) =>
					({
						label: r.data?.name ?? '',
						link: { route: `/library/${section}${r.path ? '/' : ''}${r.path}`, exact: r.path?.length === 0 },
						click: () => {
							// nop
						}
					}));
		}
		return [];
	}

	buildIDTabs(section: string, id: string): Array<HeaderTab> {
		const libRoutes = routes.find(r => r.path === 'library')!;
		const tabSection = libRoutes.children?.find((r: Route) => r.path === `${section}/id/:id`);
		if (tabSection?.children) {
			return tabSection.children
				.filter((r: Route) => !!r.data)
				.map((r: LinkRoute) =>
					({
						label: r.data?.name ?? '',
						link: { route: `/library/${section}/id/${id}${r.path ? '/' : ''}${r.path}`, exact: r.path?.length === 0 },
						click: () => {
							// nop
						}
					}));
		}
		return [];
	}

	openJamObjectMenu(item: JamLibraryObject, event: Event, options?: ContextMenuObjComponentOptions) {
		this.menuService.openMenuComponent<ContextMenuObjComponentOptions>(ContextMenuObjComponent, item, event, options);
	}

	openSimpleMenu(entries: Array<any>, event: Event) {
		this.menuService.openMenuComponent<ContextMenuSimpleComponentOptions>(ContextMenuSimpleComponent, undefined, event, { entries });
	}
}
