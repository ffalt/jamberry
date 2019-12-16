import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthCanActivateGuard} from '@app/guards';

import {SeriesIdPageComponent} from '@library/pages/series-id-page/series-id-page.component';
import {LibraryComponent} from './library.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AlbumOverviewComponent } from './components/album-overview/album-overview.component';
import { AlbumMbComponent } from './components/album-mb/album-mb.component';
import { AlbumsPageByTypeComponent } from './components/albums-page-by-type/albums-page-by-type.component';
import { AlbumsIndexLoaderByTypeComponent } from './components/albums-index-loader-by-type/albums-index-loader-by-type.component';
import { ObjsLoaderByTypeComponent } from './components/obj-loader-by-type/objs-loader-by-type.component';
import { PodcastPageComponent } from './pages/podcast-page/podcast-page.component';
import { PodcastsPageComponent } from './pages/podcasts-page/podcasts-page.component';
import { PodcastsLatestEpisodesComponent } from './components/podcasts-latest-episodes/podcasts-latest-episodes.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { ArtistIndexPageComponent } from './pages/artistindex-page/artist-index-page.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { ArtistOverviewComponent } from './components/artist-overview/artist-overview.component';
import { ArtistSimilarComponent } from './components/artist-similar/artist-similar.component';
import { ArtistMbComponent } from './components/artist-mb/artist-mb.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { ArtistsIndexLoaderComponent } from './components/artists-index-loader/artists-index-loader.component';
import { SeriesPageComponent } from './pages/series-page/series-page.component';
import { SeriesIndexLoaderComponent } from './components/series-index-loader/series-index-loader.component';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { TrackOverviewComponent } from './components/track-overview/track-overview.component';
import { TrackSimilarComponent } from './components/track-similar/track-similar.component';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { TracksLoaderByTypeComponent } from './components/tracks-loader-by-type/tracks-loader-by-type.component';
import { FolderPageComponent } from './pages/folder-page/folder-page.component';
import { FolderIndexPageComponent } from './pages/folderindex-page/folder-index-page.component';
import { EpisodePageComponent } from './pages/episode-page/episode-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { QueuePageComponent } from './pages/queue-page/queue-page.component';

export const routes: Routes = [
	{
		path: '', component: LibraryComponent,
		children: [
			{path: '', pathMatch: 'full', component: StartPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Library'}},

			{
				path: 'albums/id/:id', component: AlbumPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					// {
					// 	path: 'similar',
					// 	component: ArtistSimilarComponent,
					// 	canActivate: [AuthCanActivateGuard],
					// 	data: {name: 'Similar'}
					// },
					{
						path: 'musicbrainz',
						component: AlbumMbComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'MusicBrainz'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'albums', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Albums'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'compilations', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Compilations'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{
						path: 'random',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random'}
					},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'soundtracks', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Soundtracks'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'audiobooks', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Audiobooks'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'bootlegs', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Bootlegs'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'singles', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Singles'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Singles Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'live', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Live'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{path: 'top-rated', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated'}},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'eps', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'EPs'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{path: 'top-rated', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated'}},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{path: 'podcasts/id/:id', component: PodcastPageComponent, canActivate: [AuthCanActivateGuard]},
			{
				path: 'podcasts/search',
				loadChildren: () => import('./pages/podcast-search-page/podcast-search-page.module').then(m => m.PodcastSearchPageModule),
				canActivate: [AuthCanActivateGuard]
			},
			{
				path: 'podcasts', component: PodcastsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Podcasts'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Podcasts'}
					},
					{
						path: 'latest',
						component: PodcastsLatestEpisodesComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Latest Episodes'}
					},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Podcasts'}},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{path: 'playlists/id/:id', component: PlaylistPageComponent, canActivate: [AuthCanActivateGuard]},
			{
				path: 'playlists', component: PlaylistsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Playlists'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{
						path: 'random',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random'}
					},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{path: 'artists/index', component: ArtistIndexPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Artist Index'}},
			{
				path: 'artists/id/:id', component: ArtistPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ArtistOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{
						path: 'similar',
						component: ArtistSimilarComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Similar'}
					},
					{
						path: 'musicbrainz',
						component: ArtistMbComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'MusicBrainz'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'artists', component: ArtistsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Artists'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ArtistsIndexLoaderComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Artists'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{
				path: 'series/id/:id', component: SeriesIdPageComponent, canActivate: [AuthCanActivateGuard]
			},
			{
				path: 'series', component: SeriesPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Series'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: SeriesIndexLoaderComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ObjsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{
				path: 'tracks/id/:id', component: TrackPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: TrackOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{
						path: 'similar',
						component: TrackSimilarComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Similar'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'tracks', component: TracksPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Tracks'},
				children: [
					// {path: '', pathMatch: 'full', component: TracksIndexLoaderComponent, canActivate: [AuthGuard], data: {name: 'Track Index'}},
					{path: 'random', component: TracksLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: TracksLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{
						path: 'top-rated',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: 'favorites'}
				]
			},

			{path: 'folders/id/:id', component: FolderPageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'folders/index', component: FolderIndexPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Folder Index'}},
			{path: 'episodes/id/:id', component: EpisodePageComponent, canActivate: [AuthCanActivateGuard]},

			{path: 'search', component: SearchPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Search'}},
			{path: 'queue', component: QueuePageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Queue'}}
		]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
