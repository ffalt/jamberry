import type { Routes } from '@angular/router';
import { AuthCanActivateGuard } from '@core/guards/auth-can-active/auth.can-activate.guard';

export const listRoutes: Routes = [
	{
		path: 'random',
		loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Random' }
	},
	{
		path: 'favorites',
		loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Favorites' }
	},
	{
		path: 'top-rated',
		loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Top Rated' }
	},
	{
		path: 'most-played',
		loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Most Played' }
	},
	{
		path: 'recently-played',
		loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Recently Played' }
	}
];

export const objsListRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: async () => import('./components/objs-index-loader/objs-index-loader.component').then(m => m.ObjsIndexLoaderComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Index' }
	},
	...listRoutes,
	{ path: '**', redirectTo: '' }
];

export const libaryRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: async () => import('./components/start-page/start-page.component').then(m => m.StartPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Library' }
	},
	{
		path: 'albums/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/album-overview/album-overview.component').then(m => m.AlbumOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{
				path: 'musicbrainz',
				loadComponent: async () => import('./components/album-mb/album-mb.component').then(m => m.AlbumMbComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'MusicBrainz' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'albums',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Albums' },
		children: objsListRoutes
	},
	{
		path: 'compilations',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Compilations' },
		children: objsListRoutes
	},
	{
		path: 'soundtracks',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Soundtracks' },
		children: objsListRoutes
	},
	{
		path: 'audiobooks',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Audiobooks' },
		children: objsListRoutes
	},
	{
		path: 'bootlegs',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Bootlegs' },
		children: objsListRoutes
	},
	{
		path: 'singles',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Singles' },
		children: objsListRoutes
	},
	{
		path: 'live',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Live' },
		children: objsListRoutes
	},
	{
		path: 'eps',
		loadComponent: async () => import('./components/albums-page-by-type/albums-page-by-type.component').then(m => m.AlbumsPageByTypeComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'EPs' },
		children: objsListRoutes
	},
	{
		path: 'podcasts/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/podcast-overview/podcast-overview.component').then(m => m.PodcastOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'podcasts/search',
		loadComponent: async () => import('./components/podcast-search-page/podcast-search-page.component').then(m => m.PodcastSearchPageComponent),
		canActivate: [AuthCanActivateGuard]
	},
	{
		path: 'podcasts',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Podcasts' },
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Index' }
			},
			{
				path: 'latest',
				loadComponent: async () => import('./components/podcasts-latest-episodes/podcasts-latest-episodes.component').then(m => m.PodcastsLatestEpisodesComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Latest Episodes' }
			},
			...listRoutes,
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'playlists/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/playlist-overview/playlist-overview.component').then(m => m.PlaylistOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'playlists',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Playlists' },
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/obj-loader-by-type/objs-loader-by-type.component').then(m => m.ObjsLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Index' }
			},
			...listRoutes,
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'artists/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/artist-overview/artist-overview.component').then(m => m.ArtistOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{
				path: 'similar',
				loadComponent: async () => import('./components/artist-similar/artist-similar.component').then(m => m.ArtistSimilarComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Similar' }
			},
			{
				path: 'musicbrainz',
				loadComponent: async () => import('./components/artist-mb/artist-mb.component').then(m => m.ArtistMbComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'MusicBrainz' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'artists',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Artists' },
		children: objsListRoutes
	},
	{
		path: 'series/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/series-overview/series-overview.component').then(m => m.SeriesOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'series',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Series' },
		children: objsListRoutes
	},
	{
		path: 'tracks/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/track-overview/track-overview.component').then(m => m.TrackOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{
				path: 'similar',
				loadComponent: async () => import('./components/track-similar/track-similar.component').then(m => m.TrackSimilarComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Similar' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'tracks',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Tracks' },
		children: [
			// {path: '', pathMatch: 'full', component: TracksIndexLoaderComponent, canActivate: [AuthGuard], data: {name: 'Track Index'}},
			{
				path: 'random',
				loadComponent: async () => import('./components/tracks-loader-by-type/tracks-loader-by-type.component').then(m => m.TracksLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Random' }
			},
			{
				path: 'favorites',
				loadComponent: async () => import('./components/tracks-loader-by-type/tracks-loader-by-type.component').then(m => m.TracksLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Favorites' }
			},
			{
				path: 'top-rated',
				loadComponent: async () => import('./components/tracks-loader-by-type/tracks-loader-by-type.component').then(m => m.TracksLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Top Rated' }
			},
			{
				path: 'most-played',
				loadComponent: async () => import('./components/tracks-loader-by-type/tracks-loader-by-type.component').then(m => m.TracksLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Most Played' }
			},
			{
				path: 'recently-played',
				loadComponent: async () => import('./components/tracks-loader-by-type/tracks-loader-by-type.component').then(m => m.TracksLoaderByTypeComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Recently Played' }
			},
			{ path: '**', redirectTo: 'random' }
		]
	},
	{
		path: 'folders/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/folder-overview/folder-overview.component').then(m => m.FolderOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{
				path: 'similar',
				loadComponent: async () => import('./components/folder-similar/folder-similar.component').then(m => m.FolderSimilarComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Similar' }
			},
			{
				path: 'musicbrainz',
				loadComponent: async () => import('./components/folder-mb/folder-musicbrainz.component').then(m => m.FolderMusicbrainzComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'MusicBrainz' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'folders',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Folders' },
		children: objsListRoutes
	},
	{
		path: 'episodes/id/:id',
		loadComponent: async () => import('./components/obj-page/obj-page.component').then(m => m.ObjPageComponent),
		canActivate: [AuthCanActivateGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./components/episode-overview/episode-overview.component').then(m => m.EpisodeOverviewComponent),
				canActivate: [AuthCanActivateGuard],
				data: { name: 'Overview' }
			},
			{ path: '**', redirectTo: '' }
		]
	},
	{
		path: 'search',
		loadComponent: async () => import('./components/search-page/search-page.component').then(m => m.SearchPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Search' }
	},
	{
		path: 'queue',
		loadComponent: async () => import('./components/queue-page/queue-page.component').then(m => m.QueuePageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Queue' }
	},
	{
		path: 'genres/id/:id',
		loadComponent: async () => import('./components/genre-page/genre-page.component').then(m => m.GenrePageComponent),
		canActivate: [AuthCanActivateGuard]
	},
	{
		path: 'genres/id/:id/:type',
		loadComponent: async () => import('./components/genre-page/genre-page.component').then(m => m.GenrePageComponent),
		canActivate: [AuthCanActivateGuard]
	},
	{
		path: 'genres',
		loadComponent: async () => import('./components/objs-page/objs-page.component').then(m => m.ObjsPageComponent),
		canActivate: [AuthCanActivateGuard],
		data: { name: 'Genres' },
		children: objsListRoutes
	}
];
