import {AdminFolderComponent} from './folder-page/admin-folder.component';
import {AdminFolderFoldersComponent} from './folder-page/folders/admin-folder-folders.component';
import {AdminFolderHealthComponent} from './folder-page/health/admin-folder-health.component';
import {AdminFolderOverviewComponent} from './folder-page/overview/admin-folder-overview.component';
import {AdminTracksHealthComponent} from './folder-page/tracks-health/admin-tracks-health.component';
import {AdminFolderTracksComponent} from './folder-page/tracks/admin-folder-tracks.component';
import {AdminRadarComponent} from './radar-page/admin-radar.component';
import {AdminRootComponent} from './root-page/admin-root.component';
import {AdminSettingsComponent} from './settings-page/admin-settings.component';
import {AdminStartComponent} from './start-page/admin.start.component';
import {AdminUsersComponent} from './users-page/admin-users.component';

export const pages: Array<any> = [
	AdminFolderComponent,
	AdminFolderComponent,
	AdminFolderHealthComponent,
	AdminFolderOverviewComponent,
	AdminFolderTracksComponent,
	AdminFolderFoldersComponent,
	AdminRadarComponent,
	AdminRootComponent,
	AdminSettingsComponent,
	AdminStartComponent,
	AdminTracksHealthComponent,
	AdminUsersComponent
];

export * from './folder-page/admin-folder.component';
export * from './folder-page/folders/admin-folder-folders.component';
export * from './folder-page/health/admin-folder-health.component';
export * from './folder-page/overview/admin-folder-overview.component';
export * from './folder-page/tracks-health/admin-tracks-health.component';
export * from './folder-page/tracks/admin-folder-tracks.component';
export * from './radar-page/admin-radar.component';
export * from './root-page/admin-root.component';
export * from './settings-page/admin-settings.component';
export * from './start-page/admin.start.component';
export * from './users-page/admin-users.component';
