import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminFolderComponent} from './components/folder-page/admin-folder.component';
import {AdminFolderFoldersComponent} from './components/folder-page/folders/admin-folder-folders.component';
import {AdminFolderHealthComponent} from './components/folder-page/health/admin-folder-health.component';
import {AdminFolderOverviewComponent} from './components/folder-page/overview/admin-folder-overview.component';
import {AdminTracksHealthComponent} from './components/folder-page/tracks-health/admin-tracks-health.component';
import {AdminFolderTracksComponent} from './components/folder-page/tracks/admin-folder-tracks.component';
import {AdminRadarComponent} from './components/radar-page/admin-radar.component';
import {AdminRootComponent} from './components/root-page/admin-root.component';
import {AdminSettingsComponent} from './components/settings-page/admin-settings.component';
import {AdminStartComponent} from './components/start-page/admin.start.component';
import {AdminUsersComponent} from './components/users-page/admin-users.component';

export const routes: Routes = [
	{
		path: '', component: AdminComponent,
		children: [
			{path: '', pathMatch: 'full', component: AdminStartComponent, data: {name: 'Admin'}},
			{path: 'user', component: AdminUsersComponent, data: {name: 'Users', icon: 'icon-user'}},
			{path: 'root', component: AdminRootComponent, data: {name: 'Roots', icon: 'icon-root'}},
			{path: 'folder', redirectTo: 'folder/'},
			{
				path: 'folder/:id', component: AdminFolderComponent, data: {id: 'folder', name: 'Folders', icon: 'icon-folder', link: 'folder'},
				children: [
					{path: 'overview', component: AdminFolderOverviewComponent},
					{path: 'health', component: AdminFolderHealthComponent},
					{path: 'sub-folders', component: AdminFolderFoldersComponent},
					{path: 'tracks', component: AdminFolderTracksComponent},
					{path: 'tracks-health', component: AdminTracksHealthComponent},
					{path: 'tags', loadChildren: (): Promise<any> => import('../tag-editor/tag-editor.module').then(m => m.TagEditorModule)}
				]
			},
			{path: 'radar', component: AdminRadarComponent, data: {name: 'Health Radar', icon: 'icon-health'}},
			{path: 'settings', component: AdminSettingsComponent, data: {name: 'Admin Settings'}}
		]
	}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
