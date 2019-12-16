import { AlbumListComponent } from './album-list/album-list.component';
import {AlbumMbComponent} from './album-mb/album-mb.component';
import {AlbumOverviewComponent} from './album-overview/album-overview.component';
import {AlbumsIndexLoaderByTypeComponent} from './albums-index-loader-by-type/albums-index-loader-by-type.component';
import {AlbumsIndexLoaderComponent} from './albums-index-loader/albums-index-loader.component';
import {AlbumsPageByTypeComponent} from './albums-page-by-type/albums-page-by-type.component';
import {ArtistMbComponent} from './artist-mb/artist-mb.component';
import {ArtistOverviewComponent} from './artist-overview/artist-overview.component';
import {ArtistSimilarComponent} from './artist-similar/artist-similar.component';
import {ArtistsIndexLoaderComponent} from './artists-index-loader/artists-index-loader.component';
import {ChatComponent} from './chat/chat.component';
import {ContextMenuEpisodeComponent} from './context-menu-episode/context-menu-episode.component';
import {ContextMenuObjComponent} from './context-menu-obj/context-menu-obj.component';
import {ContextMenuPlaylistComponent} from './context-menu-playlist/context-menu-playlist.component';
import {ContextMenuPlaylistsComponent} from './context-menu-playlists/context-menu-playlists.component';
import {ContextMenuPodcastComponent} from './context-menu-podcast/context-menu-podcast.component';
import {ContextMenuPodcastsComponent} from './context-menu-podcasts/context-menu-podcasts.component';
import {ContextMenuQueueComponent} from './context-menu-queue/context-menu-queue.component';
import {ContextMenuTrackComponent} from './context-menu-track/context-menu-track.component';
import {CurrentPlayingComponent} from './current-playing/current-playing.component';
import {EpisodeListComponent} from './episode-list/episode-list.component';
import {EpisodeStateButtonComponent} from './episode-state-button/episode-state.button.component';
import {IndexEntryCardComponent} from './index-entry-card/index-entry-card.component';
import {IndexGroupComponent} from './index-group/index-group.component';
import {IndexComponent} from './index/index.component';
import {MbAlbumComponent} from './mb-album/mb-album.component';
import {MbArtistComponent} from './mb-artist/mb-artist.component';
import {MbRelationsComponent} from './mb-relations/mb-relations.component';
import {ObjGroupsViewComponent} from './obj-groups-view/obj-groups-view.component';
import {ObjsLoaderByTypeComponent} from './obj-loader-by-type/objs-loader-by-type.component';
import {ObjPlateComponent} from './obj-plate/obj-plate.component';
import {ObjsLoaderComponent} from './objs-loader/objs-loader.component';
import {PodcastsLatestEpisodesComponent} from './podcasts-latest-episodes/podcasts-latest-episodes.component';
import {SeriesIndexLoaderComponent} from './series-index-loader/series-index-loader.component';
import {SidebarIndexComponent} from './sidebar-index/sidebar-index.component';
import {SidebarListComponent} from './sidebar-list/sidebar-list.component';
import {SidebarRightComponent} from './sidebar-right/sidebar-right.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {StartSectionComponent} from './start-section/start-section.component';
import {TabsComponent} from './tabs/tabs.component';
import {TrackListComponent} from './track-list/track-list.component';
import {TrackOverviewComponent} from './track-overview/track-overview.component';
import {TrackSimilarComponent} from './track-similar/track-similar.component';
import {TracksLoaderByTypeComponent} from './tracks-loader-by-type/tracks-loader-by-type.component';
import {TracksLoaderComponent} from './tracks-loader/tracks-loader.component';
import {TracksPlaylistComponent} from './tracks-playlist/tracks-playlist.component';

export const entryComponents: Array<any> = [
	ContextMenuObjComponent,
	ContextMenuEpisodeComponent,
	ContextMenuPlaylistComponent,
	ContextMenuPlaylistsComponent,
	ContextMenuPodcastComponent,
	ContextMenuPodcastsComponent,
	ContextMenuQueueComponent,
	ContextMenuTrackComponent
];

export const components: Array<any> = [
	...entryComponents,
	AlbumMbComponent,
	AlbumOverviewComponent,
	AlbumsIndexLoaderByTypeComponent,
	AlbumsIndexLoaderComponent,
	AlbumsPageByTypeComponent,
	AlbumListComponent,
	ArtistMbComponent,
	ArtistOverviewComponent,
	ArtistSimilarComponent,
	ArtistsIndexLoaderComponent,
	ChatComponent,
	CurrentPlayingComponent,
	EpisodeStateButtonComponent,
	EpisodeListComponent,
	IndexComponent,
	IndexEntryCardComponent,
	IndexGroupComponent,
	MbArtistComponent,
	MbAlbumComponent,
	MbRelationsComponent,
	ObjPlateComponent,
	ObjsLoaderComponent,
	ObjGroupsViewComponent,
	ObjsLoaderByTypeComponent,
	PodcastsLatestEpisodesComponent,
	SeriesIndexLoaderComponent,
	SidebarComponent,
	SidebarIndexComponent,
	SidebarListComponent,
	SidebarRightComponent,
	StartSectionComponent,
	TabsComponent,
	TrackListComponent,
	TrackOverviewComponent,
	TrackSimilarComponent,
	TracksLoaderByTypeComponent,
	TracksLoaderComponent,
	TracksPlaylistComponent
];

export * from './album-mb/album-mb.component';
export * from './album-overview/album-overview.component';
export * from './albums-index-loader-by-type/albums-index-loader-by-type.component';
export * from './albums-index-loader/albums-index-loader.component';
export * from './albums-page-by-type/albums-page-by-type.component';
export * from './artist-mb/artist-mb.component';
export * from './artist-overview/artist-overview.component';
export * from './artist-similar/artist-similar.component';
export * from './artists-index-loader/artists-index-loader.component';
export * from './chat/chat.component';
export * from './context-menu-episode/context-menu-episode.component';
export * from './context-menu-obj/context-menu-obj.component';
export * from './context-menu-playlist/context-menu-playlist.component';
export * from './context-menu-playlists/context-menu-playlists.component';
export * from './context-menu-podcast/context-menu-podcast.component';
export * from './context-menu-podcasts/context-menu-podcasts.component';
export * from './context-menu-queue/context-menu-queue.component';
export * from './context-menu-track/context-menu-track.component';
export * from './current-playing/current-playing.component';
export * from './episode-state-button/episode-state.button.component';
export * from './episode-list/episode-list.component';
export * from './index-entry-card/index-entry-card.component';
export * from './index-group/index-group.component';
export * from './index/index.component';
export * from './mb-album/mb-album.component';
export * from './mb-artist/mb-artist.component';
export * from './mb-relations/mb-relations.component';
export * from './obj-groups-view/obj-groups-view.component';
export * from './obj-plate/obj-plate.component';
export * from './objs-loader/objs-loader.component';
export * from './podcasts-latest-episodes/podcasts-latest-episodes.component';
export * from './series-index-loader/series-index-loader.component';
export * from './sidebar-index/sidebar-index.component';
export * from './sidebar-list/sidebar-list.component';
export * from './sidebar-right/sidebar-right.component';
export * from './sidebar/sidebar.component';
export * from './start-section/start-section.component';
export * from './tabs/tabs.component';
export * from './track-overview/track-overview.component';
export * from './track-similar/track-similar.component';
export * from './tracks-loader-by-type/tracks-loader-by-type.component';
export * from './tracks-loader/tracks-loader.component';
export * from './tracks-playlist/tracks-playlist.component';
export * from './track-list/track-list.component';
export * from './obj-loader-by-type/objs-loader-by-type.component';
export * from './album-list/album-list.component';
