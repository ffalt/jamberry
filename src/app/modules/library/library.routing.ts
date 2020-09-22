import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthCanActivateGuard} from '@app/guards';
import {
	AlbumMbComponent,
	AlbumOverviewComponent,
	AlbumsPageByTypeComponent,
	ArtistMbComponent,
	ArtistOverviewComponent,
	ArtistSimilarComponent,
	EpisodeOverviewComponent,
	FolderMusicbrainzComponent,
	FolderOverviewComponent,
	FolderSimilarComponent,
	GenrePageComponent,
	ObjPageComponent,
	ObjsIndexLoaderComponent,
	ObjsLoaderByTypeComponent,
	ObjsPageComponent,
	PlaylistOverviewComponent,
	PodcastOverviewComponent,
	PodcastsLatestEpisodesComponent,
	QueuePageComponent,
	SearchPageComponent,
	SeriesOverviewComponent,
	StartPageComponent,
	TrackOverviewComponent,
	TrackSimilarComponent,
	TracksLoaderByTypeComponent
} from '@library/components';
import {LibraryComponent} from './library.component';

export const listRoutes: Routes = [
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
	}
];

export const objsListRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ObjsIndexLoaderComponent,
		canActivate: [AuthCanActivateGuard],
		data: {name: 'Index'}
	},
	...listRoutes,
	{path: '**', redirectTo: ''}
];

export const routes: Routes = [
	{
		path: '', component: LibraryComponent,
		children: [
			{path: '', pathMatch: 'full', component: StartPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Library'}},

			{
				path: 'albums/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
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
				children: objsListRoutes
			},
			{
				path: 'compilations', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Compilations'},
				children: objsListRoutes
			},
			{
				path: 'soundtracks', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Soundtracks'},
				children: objsListRoutes
			},
			{
				path: 'audiobooks', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Audiobooks'},
				children: objsListRoutes
			},
			{
				path: 'bootlegs', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Bootlegs'},
				children: objsListRoutes
			},
			{
				path: 'singles', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Singles'},
				children: objsListRoutes
			},
			{
				path: 'live', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Live'},
				children: objsListRoutes
			},
			{
				path: 'eps', component: AlbumsPageByTypeComponent, canActivate: [AuthCanActivateGuard], data: {name: 'EPs'},
				children: objsListRoutes
			},

			{
				path: 'podcasts/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: PodcastOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'podcasts/search',
				loadChildren: (): Promise<any> => import('./components/podcast-search-page/podcast-search-page.module').then(m => m.PodcastSearchPageModule),
				canActivate: [AuthCanActivateGuard]
			},
			{
				path: 'podcasts', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Podcasts'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					{
						path: 'latest',
						component: PodcastsLatestEpisodesComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Latest Episodes'}
					},
					...listRoutes,
					{path: '**', redirectTo: ''}
				]
			},

			{
				path: 'playlists/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: PlaylistOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'playlists', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Playlists'},
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: ObjsLoaderByTypeComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Index'}
					},
					...listRoutes,
					{path: '**', redirectTo: ''}
				]
			},

			{
				path: 'artists/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
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
				path: 'artists', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Artists'},
				children: objsListRoutes
			},

			{
				path: 'series/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: SeriesOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'series', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Series'},
				children: objsListRoutes
			},

			{
				path: 'tracks/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
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
				path: 'tracks', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Tracks'},
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
					{path: '**', redirectTo: 'random'}
				]
			},

			{
				path: 'folders/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: FolderOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{
						path: 'similar',
						component: FolderSimilarComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Similar'}
					},
					{
						path: 'musicbrainz',
						component: FolderMusicbrainzComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'MusicBrainz'}
					},
					{path: '**', redirectTo: ''}
				]
			},
			{
				path: 'folders', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Folders'},
				children: objsListRoutes
			},

			{
				path: 'episodes/id/:id', component: ObjPageComponent, canActivate: [AuthCanActivateGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: EpisodeOverviewComponent,
						canActivate: [AuthCanActivateGuard],
						data: {name: 'Overview'}
					},
					{path: '**', redirectTo: ''}
				]
			},

			{path: 'search', component: SearchPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Search'}},
			{path: 'queue', component: QueuePageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Queue'}},

			{path: 'genres/id/:id', component: GenrePageComponent, canActivate: [AuthCanActivateGuard]},
			{path: 'genres/id/:id/:type', component: GenrePageComponent, canActivate: [AuthCanActivateGuard]},
			{
				path: 'genres', component: ObjsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Genres'},
				children: objsListRoutes
			}
		]
	}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
