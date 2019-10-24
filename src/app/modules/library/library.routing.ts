import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthCanActivateGuard} from '@app/guards';
import {
	AlbumsIndexLoaderByTypeComponent,
	AlbumsLoaderByTypeComponent,
	AlbumsPageByTypeComponent,
	ArtistMbComponent,
	ArtistOverviewComponent,
	ArtistSimilarComponent,
	ArtistsIndexLoaderComponent,
	ArtistsLoaderByTypeComponent,
	PlaylistsLoaderByTypeComponent,
	PodcastsLatestEpisodesComponent,
	PodcastsLoaderByTypeComponent,
	TracksLoaderByTypeComponent
} from '@library/components';
import {
	AlbumPageComponent,
	ArtistIndexPageComponent,
	ArtistPageComponent,
	ArtistsPageComponent,
	EpisodePageComponent,
	FolderIndexPageComponent,
	FolderPageComponent,
	PlaylistPageComponent,
	PlaylistsPageComponent,
	PodcastPageComponent,
	PodcastsPageComponent,
	QueuePageComponent,
	SearchPageComponent,
	SeriesPageComponent,
	StartPageComponent,
	TrackPageComponent,
	TracksPageComponent
} from '@library/pages';
import {LibraryComponent} from './library.component';

export const routes: Routes = [
	{
		path: '', component: LibraryComponent,
		children: [
			{path: '', pathMatch: 'full', component: StartPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Library'}},

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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random'}
					},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'series-episodes', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Series'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{path: 'top-rated', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated'}},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
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
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorites'}},
					{path: 'top-rated', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated'}},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{
				path: 'podcasts', component: PodcastsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Podcasts'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: PodcastsLoaderByTypeComponent,
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
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{path: 'random', component: PodcastsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Podcasts'}},
					{
						path: 'top-rated',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'playlists', component: PlaylistsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Playlists'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{
						path: 'favorites',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'recently-played',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
					},
					{
						path: 'random',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random'}
					},
					{
						path: 'favorites',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
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
					{path: 'random', component: ArtistsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Artists'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'series', component: SeriesPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Series'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ArtistsIndexLoaderComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{path: 'random', component: ArtistsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random'}},
					{
						path: 'favorites',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorites'}
					},
					{
						path: 'top-rated',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated'}
					},
					{
						path: 'most-played',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played'}
					},
					{
						path: 'recently-played',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played'}
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

			{path: 'album/:id', component: AlbumPageComponent, canActivate: [AuthCanActivateGuard]},

			{
				path: 'artist/:id', component: ArtistPageComponent, canActivate: [AuthCanActivateGuard],
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

			{path: 'track/:id', component: TrackPageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'folder/:id', component: FolderPageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'playlist/:id', component: PlaylistPageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'podcast/:id', component: PodcastPageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'episode/:id', component: EpisodePageComponent, canActivate: [AuthCanActivateGuard]},

			{path: 'search', component: SearchPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Search'}},
			{path: 'queue', component: QueuePageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Queue'}},
			{path: 'artist-index', component: ArtistIndexPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Artist Index'}},
			{path: 'folder-index', component: FolderIndexPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Folder Index'}},
			{
				path: 'podcast-search',
				loadChildren: () => import('./pages/podcast-search-page/podcast-search-page.module').then(m => m.PodcastSearchPageModule),
				canActivate: [AuthCanActivateGuard]
			}
		]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
