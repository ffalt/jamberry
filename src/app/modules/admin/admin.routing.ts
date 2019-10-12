import {AdminFolderFoldersComponent} from '@admin/pages/folder-page/folders/admin-folder-folders.component';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminAlbumComponent} from './pages/album-page/admin-album.component';
import {AdminAlbumsComponent} from './pages/albums-page/admin-albums.component';
import {AdminArtistComponent} from './pages/artist-page/admin-artist.component';
import {AdminArtistsComponent} from './pages/artists-page/admin-artists.component';
import {AdminFolderComponent} from './pages/folder-page/admin-folder.component';
import {AdminFolderHealthComponent} from './pages/folder-page/health/admin-folder-health.component';
import {AdminFolderOverviewComponent} from './pages/folder-page/overview/admin-folder-overview.component';
import {AdminTracksHealthComponent} from './pages/folder-page/tracks-health/admin-tracks-health.component';
import {AdminFolderTracksComponent} from './pages/folder-page/tracks/admin-folder-tracks.component';
import {AdminGenresComponent} from './pages/genres-page/admin-genres.component';
import {AdminRadarComponent} from './pages/radar-page/admin-radar.component';
import {AdminRootComponent} from './pages/root-page/admin-root.component';
import {AdminSettingsComponent} from './pages/settings-page/admin-settings.component';
import {AdminStartComponent} from './pages/start-page/admin.start.component';
import {AdminUsersComponent} from './pages/users-page/admin-users.component';

export const routes: Routes = [
	{
		path: '', component: AdminComponent,
		children: [
			{path: '', pathMatch: 'full', component: AdminStartComponent, data: {name: 'Admin'}},
			{path: 'user', component: AdminUsersComponent, data: {name: 'Users', icon: 'icon-user'}},
			{path: 'root', component: AdminRootComponent, data: {name: 'Roots', icon: 'icon-root'}},
			{path: 'folder', redirectTo: 'folder/'},
			{
				path: 'folder/:id', component: AdminFolderComponent, data: {id: 'folder', name: 'Folders', icon: 'icon-folder', link: 'folder/'},
				children: [
					{path: 'overview', component: AdminFolderOverviewComponent},
					{path: 'health', component: AdminFolderHealthComponent},
					{path: 'sub-folders', component: AdminFolderFoldersComponent},
					{path: 'tracks', component: AdminFolderTracksComponent},
					{path: 'tracks-health', component: AdminTracksHealthComponent},
					{path: 'tags', loadChildren: () => import('../tag-editor/tag-editor.module').then(m => m.TagEditorModule)}
				]
			},
			{path: 'artist/:id', component: AdminArtistComponent},
			{path: 'artist', component: AdminArtistsComponent, data: {name: 'Artists', icon: 'icon-artist'}},
			{path: 'album', component: AdminAlbumsComponent, data: {name: 'Albums', icon: 'icon-album'}},
			{path: 'album/:id', component: AdminAlbumComponent},

			{path: 'radar', component: AdminRadarComponent, data: {name: 'Health Radar', icon: 'icon-health'}},
			{path: 'genre', component: AdminGenresComponent, data: {name: 'Genres', icon: 'icon-genre'}},
			{path: 'settings', component: AdminSettingsComponent, data: {name: 'Admin Settings'}}
		]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
