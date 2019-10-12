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
						data: {name: 'Album Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Albums'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorite Albums'}},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Albums'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Albums'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Albums'}
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
						data: {name: 'Compilations Index'}
					},
					{
						path: 'random',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random Compilations'}
					},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Compilations'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Compilations'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Compilations'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Compilations'}
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
						data: {name: 'Soundtracks Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Soundtracks'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Soundtracks'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Soundtracks'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Soundtracks'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Soundtracks'}
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
						data: {name: 'Audiobooks Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Audiobooks'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Audiobooks'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Audiobooks'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Audiobooks'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Audiobooks'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'audiodrama', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Audio Drama'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: AlbumsIndexLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Audio Drama Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Audio Drama'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Audio Drama'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Audio Drama'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Audio Drama'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Audio Drama'}
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
						data: {name: 'Bootlegs Index'}
					},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Bootlegs'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Bootlegs'}},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Bootlegs'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Bootlegs'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Bootlegs'}
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
						data: {name: 'Bootlegs Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Singles'}},
					{
						path: 'favorites',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Singles'}
					},
					{
						path: 'top-rated',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Singles'}
					},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Singles'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Singles'}
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
						data: {name: 'Live Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Live'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorite Live'}},
					{path: 'top-rated', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated Live'}},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Live'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Live'}
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
						data: {name: 'EPs Index'}
					},
					{path: 'random', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random EPs'}},
					{path: 'favorites', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorite EPs'}},
					{path: 'top-rated', component: AlbumsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Top Rated EPs'}},
					{
						path: 'most-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played EPs'}
					},
					{
						path: 'recently-played',
						component: AlbumsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played EPs'}
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
						data: {name: 'Latest Podcast Episodes'}
					},
					{
						path: 'favorites',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Podcasts'}
					},
					{path: 'random', component: PodcastsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Podcasts'}},
					{
						path: 'top-rated',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Podcasts'}
					},
					{
						path: 'most-played',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Podcasts'}
					},
					{
						path: 'recently-played',
						component: PodcastsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Podcasts'}
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
						data: {name: 'Playlists'}
					},
					{
						path: 'favorites',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Playlists'}
					},
					{
						path: 'recently-played',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Playlists'}
					},
					{
						path: 'random',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Random Playlists'}
					},
					{
						path: 'favorites',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Playlists'}
					},
					{
						path: 'top-rated',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Playlists'}
					},
					{
						path: 'most-played',
						component: PlaylistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Playlists'}
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
						data: {name: 'Artist Index'}
					},
					{path: 'random', component: ArtistsLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Artists'}},
					{
						path: 'favorites',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Favorite Artists'}
					},
					{
						path: 'top-rated',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Artists'}
					},
					{
						path: 'most-played',
						component: ArtistsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Artists'}
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
				path: 'tracks', component: TracksPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Tracks'},
				children: [
					// {path: '', pathMatch: 'full', component: TracksIndexLoaderComponent, canActivate: [AuthGuard], data: {name: 'Track Index'}},
					{path: 'random', component: TracksLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Random Tracks'}},
					{path: 'favorites', component: TracksLoaderByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Favorite Tracks'}},
					{
						path: 'top-rated',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Top Rated Tracks'}
					},
					{
						path: 'most-played',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Most Played Tracks'}
					},
					{
						path: 'recently-played',
						component: TracksLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Recently Played Tracks'}
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
