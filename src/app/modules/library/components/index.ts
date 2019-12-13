import {AlbumCardComponent} from './album-card/album-card.component';
import {AlbumMbComponent} from './album-mb/album-mb.component';
import {AlbumOverviewComponent} from './album-overview/album-overview.component';
import {AlbumPlateComponent} from './album-plate/album-plate.component';
import {AlbumsIndexLoaderByTypeComponent} from './albums-index-loader-by-type/albums-index-loader-by-type.component';
import {AlbumsIndexLoaderComponent} from './albums-index-loader/albums-index-loader.component';
import {AlbumsLoaderByTypeComponent} from './albums-loader-by-type/albums-loader-by-type.component';
import {AlbumsLoaderComponent} from './albums-loader/albums-loader.component';
import {AlbumsPageByTypeComponent} from './albums-page-by-type/albums-page-by-type.component';
import {AlbumsComponent} from './albums/albums.component';
import {ArtistCardComponent} from './artist-card/artist-card.component';
import {ArtistMbComponent} from './artist-mb/artist-mb.component';
import {ArtistOverviewComponent} from './artist-overview/artist-overview.component';
import {ArtistPlateComponent} from './artist-plate/artist-plate.component';
import {ArtistSimilarComponent} from './artist-similar/artist-similar.component';
import {ArtistsIndexLoaderComponent} from './artists-index-loader/artists-index-loader.component';
import {ArtistsLoaderByTypeComponent} from './artists-loader-by-type/artists-loader-by-type.component';
import {ArtistsLoaderComponent} from './artists-loader/artists-loader.component';
import {ArtistsComponent} from './artists/artists.component';
import {ChatComponent} from './chat/chat.component';
import {ContextMenuAlbumComponent} from './context-menu-album/context-menu-album.component';
import {ContextMenuArtistComponent} from './context-menu-artist/context-menu-artist.component';
import {ContextMenuEpisodeComponent} from './context-menu-episode/context-menu-episode.component';
import {ContextMenuFolderComponent} from './context-menu-folder/context-menu-folder.component';
import {ContextMenuPlaylistComponent} from './context-menu-playlist/context-menu-playlist.component';
import {ContextMenuPlaylistsComponent} from './context-menu-playlists/context-menu-playlists.component';
import {ContextMenuPodcastComponent} from './context-menu-podcast/context-menu-podcast.component';
import {ContextMenuPodcastsComponent} from './context-menu-podcasts/context-menu-podcasts.component';
import {ContextMenuQueueComponent} from './context-menu-queue/context-menu-queue.component';
import {ContextMenuSeriesComponent} from './context-menu-series/context-menu-series.component';
import {ContextMenuTrackComponent} from './context-menu-track/context-menu-track.component';
import {CurrentPlayingComponent} from './current-playing/current-playing.component';
import {EpisodeStateButtonComponent} from './episode-state-button/episode-state.button.component';
import {EpisodesLoaderComponent} from './episodes-loader/episodes-loader.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {FolderCardComponent} from './folder-card/folder-card.component';
import {FolderPlateComponent} from './folder-plate/folder-plate.component';
import {FoldersLoaderComponent} from './folders-loader/folders-loader.component';
import {FoldersComponent} from './folders/folders.component';
import {IndexEntryCardComponent} from './index-entry-card/index-entry-card.component';
import {IndexGroupComponent} from './index-group/index-group.component';
import {IndexComponent} from './index/index.component';
import {MbAlbumComponent} from './mb-album/mb-album.component';
import {MbArtistComponent} from './mb-artist/mb-artist.component';
import {MbRelationsComponent} from './mb-relations/mb-relations.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistsLoaderByTypeComponent} from './playlists-loader-by-type/playlists-loader-by-type.component';
import {PlaylistsLoaderComponent} from './playlists-loader/playlists-loader.component';
import {PlaylistsComponent} from './playlists/playlists.component';
import {PodcastComponent} from './podcast/podcast.component';
import {PodcastsLatestEpisodesComponent} from './podcasts-latest-episodes/podcasts-latest-episodes.component';
import {PodcastsLoaderByTypeComponent} from './podcasts-loader-by-type/podcasts-loader-by-type.component';
import {PodcastsLoaderComponent} from './podcasts-loader/podcasts-loader.component';
import {PodcastsComponent} from './podcasts/podcasts.component';
import {SeriesCardComponent} from './series-card/series-card.component';
import {SeriesIndexLoaderComponent} from './series-index-loader/series-index-loader.component';
import {SeriesLoaderByTypeComponent} from './series-loader-by-type/series-loader-by-type.component';
import {SeriesLoaderComponent} from './series-loader/series-loader.component';
import {SeriesPlateComponent} from './series-plate/series-plate.component';
import {SeriesComponent} from './series/series.component';
import {SidebarIndexComponent} from './sidebar-index/sidebar-index.component';
import {SidebarListComponent} from './sidebar-list/sidebar-list.component';
import {SidebarRightComponent} from './sidebar-right/sidebar-right.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {StartSectionComponent} from './start-section/start-section.component';
import {TabsComponent} from './tabs/tabs.component';
import {TrackOverviewComponent} from './track-overview/track-overview.component';
import {TrackSimilarComponent} from './track-similar/track-similar.component';
import {TracksLoaderByTypeComponent} from './tracks-loader-by-type/tracks-loader-by-type.component';
import {TracksLoaderComponent} from './tracks-loader/tracks-loader.component';
import {TracksPlaylistComponent} from './tracks-playlist/tracks-playlist.component';
import {TracksComponent} from './tracks/tracks.component';

export const entryComponents: Array<any> = [
	ContextMenuAlbumComponent,
	ContextMenuArtistComponent,
	ContextMenuEpisodeComponent,
	ContextMenuSeriesComponent,
	ContextMenuFolderComponent,
	ContextMenuPlaylistComponent,
	ContextMenuPlaylistsComponent,
	ContextMenuPodcastComponent,
	ContextMenuPodcastsComponent,
	ContextMenuQueueComponent,
	ContextMenuTrackComponent
];

export const components: Array<any> = [
	...entryComponents,
	AlbumPlateComponent,
	AlbumMbComponent,
	AlbumOverviewComponent,
	AlbumsComponent,
	AlbumsIndexLoaderByTypeComponent,
	AlbumsIndexLoaderComponent,
	AlbumsLoaderByTypeComponent,
	AlbumsLoaderComponent,
	AlbumsPageByTypeComponent,
	AlbumCardComponent,
	ArtistPlateComponent,
	ArtistMbComponent,
	ArtistOverviewComponent,
	ArtistSimilarComponent,
	ArtistCardComponent,
	ArtistsComponent,
	ArtistsIndexLoaderComponent,
	ArtistsLoaderByTypeComponent,
	ArtistsLoaderComponent,
	ChatComponent,
	CurrentPlayingComponent,
	EpisodeStateButtonComponent,
	EpisodesComponent,
	EpisodesLoaderComponent,
	FolderPlateComponent,
	FolderCardComponent,
	FoldersComponent,
	FoldersLoaderComponent,
	IndexComponent,
	IndexEntryCardComponent,
	IndexGroupComponent,
	MbArtistComponent,
	MbAlbumComponent,
	MbRelationsComponent,
	PlaylistComponent,
	PlaylistsComponent,
	PlaylistsLoaderByTypeComponent,
	PlaylistsLoaderComponent,
	PodcastComponent,
	PodcastsComponent,
	PodcastsLatestEpisodesComponent,
	PodcastsLoaderByTypeComponent,
	PodcastsLoaderComponent,
	SeriesComponent,
	SeriesCardComponent,
	SeriesPlateComponent,
	SeriesLoaderComponent,
	SeriesLoaderByTypeComponent,
	SeriesIndexLoaderComponent,
	SidebarComponent,
	SidebarIndexComponent,
	SidebarListComponent,
	SidebarRightComponent,
	StartSectionComponent,
	TabsComponent,
	TracksComponent,
	TrackOverviewComponent,
	TrackSimilarComponent,
	TracksLoaderByTypeComponent,
	TracksLoaderComponent,
	TracksPlaylistComponent
];

export * from './album-overview/album-overview.component';
export * from './album-mb/album-mb.component';
export * from './album-plate/album-plate.component';
export * from './albums-index-loader-by-type/albums-index-loader-by-type.component';
export * from './albums-index-loader/albums-index-loader.component';
export * from './albums-loader-by-type/albums-loader-by-type.component';
export * from './albums-loader/albums-loader.component';
export * from './albums-page-by-type/albums-page-by-type.component';
export * from './albums/albums.component';
export * from './artist-mb/artist-mb.component';
export * from './artist-overview/artist-overview.component';
export * from './artist-similar/artist-similar.component';
export * from './artist-plate/artist-plate.component';
export * from './artists-index-loader/artists-index-loader.component';
export * from './artists-loader-by-type/artists-loader-by-type.component';
export * from './artists-loader/artists-loader.component';
export * from './artists/artists.component';
export * from './chat/chat.component';
export * from './current-playing/current-playing.component';
export * from './episode-state-button/episode-state.button.component';
export * from './episodes-loader/episodes-loader.component';
export * from './episodes/episodes.component';
export * from './folder-plate/folder-plate.component';
export * from './folders-loader/folders-loader.component';
export * from './folders/folders.component';
export * from './index-entry-card/index-entry-card.component';
export * from './index-group/index-group.component';
export * from './index/index.component';
export * from './mb-album/mb-album.component';
export * from './mb-artist/mb-artist.component';
export * from './podcast/podcast.component';
export * from './podcasts-latest-episodes/podcasts-latest-episodes.component';
export * from './podcasts-loader-by-type/podcasts-loader-by-type.component';
export * from './podcasts-loader/podcasts-loader.component';
export * from './podcasts/podcasts.component';
export * from './sidebar-index/sidebar-index.component';
export * from './sidebar-list/sidebar-list.component';
export * from './sidebar-right/sidebar-right.component';
export * from './sidebar/sidebar.component';
export * from './start-section/start-section.component';
export * from './tabs/tabs.component';
export * from './tracks-playlist/tracks-playlist.component';
export * from './context-menu-album/context-menu-album.component';
export * from './context-menu-artist/context-menu-artist.component';
export * from './context-menu-folder/context-menu-folder.component';
export * from './context-menu-podcast/context-menu-podcast.component';
export * from './context-menu-episode/context-menu-episode.component';
export * from './playlist/playlist.component';
export * from './playlists-loader-by-type/playlists-loader-by-type.component';
export * from './playlists-loader/playlists-loader.component';
export * from './playlists/playlists.component';
export * from './context-menu-playlist/context-menu-playlist.component';
export * from './context-menu-playlists/context-menu-playlists.component';
export * from './tracks-loader-by-type/tracks-loader-by-type.component';
export * from './tracks-loader/tracks-loader.component';
export * from './tracks/tracks.component';
export * from './context-menu-track/context-menu-track.component';
export * from './context-menu-podcasts/context-menu-podcasts.component';
export * from './context-menu-queue/context-menu-queue.component';
export * from './track-overview/track-overview.component';
export * from './track-similar/track-similar.component';
export * from './album-card/album-card.component';
export * from './artist-card/artist-card.component';
export * from './folder-card/folder-card.component';
export * from './mb-relations/mb-relations.component';
export * from './series-loader-by-type/series-loader-by-type.component';
export * from './series-loader/series-loader.component';
export * from './series-plate/series-plate.component';
export * from './series-card/series-card.component';
export * from './series-index-loader/series-index-loader.component';
export * from './series/series.component';
export * from './context-menu-series/context-menu-series.component';
