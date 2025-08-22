import type { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { LinkRoute } from '../@types/link-route';
import { libaryRoutes } from './lib/library/library.routing';
import { AuthCanActivateGuard } from '@core/guards/auth-can-active/auth.can-activate.guard';

export const routes: Array<LinkRoute> = [
	{
		path: 'login',
		loadComponent: async () => import('./lib/login/login.component').then(m => m.LoginComponent),
		data: { name: 'Login' }
	},
	{
		path: 'logout',
		loadComponent: async () => import('./lib/logout/logout.component').then(m => m.LogoutComponent),
		data: { name: 'Logout' }
	},
	{
		path: 'library',
		canActivate: [AuthCanActivateGuard],
		loadComponent: async () => import('./lib/library/library.component').then(m => m.LibraryComponent),
		children: libaryRoutes
	},
	{
		path: 'admin',
		canActivate: [AuthCanActivateGuard],
		loadComponent: async () => import('./lib/admin/admin.component').then(m => m.AdminComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: async () => import('./lib/admin/components/start-page/admin.start.component').then(m => m.AdminStartComponent),
				data: { name: 'Admin' }
			},
			{
				path: 'settings',
				loadComponent: async () => import('./lib/admin/components/settings-page/admin-settings.component').then(m => m.AdminSettingsComponent),
				data: { name: 'Admin Settings' }
			},
			{
				path: 'root',
				loadComponent: async () => import('./lib/admin/components/root-page/admin-root.component').then(m => m.AdminRootComponent),
				data: { name: 'Roots', icon: 'icon-root' }
			},
			{
				path: 'user',
				loadComponent: async () => import('./lib/admin/components/users-page/admin-users.component').then(m => m.AdminUsersComponent),
				data: { name: 'Users', icon: 'icon-user' }
			},
			{ path: 'folder', redirectTo: 'folder/' },
			{
				path: 'folder/:id',
				loadComponent: async () => import('./lib/admin/components/folder-page/admin-folder.component').then(m => m.AdminFolderComponent),
				data: { name: 'Folders', icon: 'icon-folder', link: 'folder' },
				children: [
					{
						path: 'overview',
						loadComponent: async () => import('./lib/admin/components/folder-page/overview/admin-folder-overview.component').then(m => m.AdminFolderOverviewComponent)
					},
					{
						path: 'health',
						loadComponent: async () => import('./lib/admin/components/folder-page/health/admin-folder-health.component').then(m => m.AdminFolderHealthComponent)
					},
					{
						path: 'sub-folders',
						loadComponent: async () => import('./lib/admin/components/folder-page/folders/admin-folder-folders.component').then(m => m.AdminFolderFoldersComponent)
					},
					{
						path: 'tracks',
						loadComponent: async () => import('./lib/admin/components/folder-page/tracks/admin-folder-tracks.component').then(m => m.AdminFolderTracksComponent)
					},
					{
						path: 'tracks-health',
						loadComponent: async () => import('./lib/admin/components/folder-page/tracks-health/admin-tracks-health.component').then(m => m.AdminTracksHealthComponent)
					},
					{
						path: 'tags',
						loadComponent: async () => import('./lib/tag-editor/components/tag-editor-page/admin-folder-tag-editor-page.component').then(m => m.AdminFolderTagEditorPageComponent)
					}
				]
			},
			{
				path: 'radar',
				loadComponent: async () => import('./lib/admin/components/radar-page/admin-radar.component').then(m => m.AdminRadarComponent),
				data: { name: 'Health Radar', icon: 'icon-health' }
			}
		]
	},
	{
		path: 'user',
		canActivate: [AuthCanActivateGuard],
		loadComponent: async () => import('./lib/user/user.component').then(m => m.UserComponent),
		data: {
			name: 'Profile',
			icon: 'icon-user'
		},
		children: [
			{
				path: '',
				pathMatch: 'full',
				canActivate: [AuthCanActivateGuard],
				loadComponent: async () => import('./lib/user/pages/user-page/user-page.component').then(m => m.UserPageComponent),
				data: { name: 'User' }
			},
			{
				path: 'settings',
				canActivate: [AuthCanActivateGuard],
				loadComponent: async () => import('./lib/user/pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent),
				data: { name: 'Settings', icon: 'icon-admin' }
			},
			{
				path: 'sessions',
				canActivate: [AuthCanActivateGuard],
				loadComponent: async () => import('./lib/user/pages/sessions-page/sessions-page.component').then(m => m.SessionsPageComponent),
				data: { name: 'Sessions', icon: 'icon-laptop' }
			}
		]
	},
	{
		path: 'about',
		canActivate: [AuthCanActivateGuard],
		loadComponent: async () => import('./lib/about/about-page.component').then(m => m.AboutPageComponent)
	},
	{ path: '**', redirectTo: 'library' }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
	scrollPositionRestoration: 'enabled'
});
