import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthCanActivateGuard} from '@app/guards';
import {LoginComponent, LogoutComponent} from '@app/pages';

export const routes: Routes = [
	{path: 'login', component: LoginComponent, data: {name: 'Login'}},
	{path: 'logout', component: LogoutComponent, data: {name: 'Logout'}},
	{
		path: 'library',
		canActivate: [AuthCanActivateGuard],
		loadChildren: async (): Promise<any> => import('./modules/library/library.module').then(m => m.LibraryModule)
	},
	{
		path: 'admin',
		canActivate: [AuthCanActivateGuard],
		loadChildren: async (): Promise<any> => import('./modules/admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: 'user',
		canActivate: [AuthCanActivateGuard],
		loadChildren: async (): Promise<any> => import('./modules/user/user.module').then(m => m.UserModule)
	},
	{
		path: 'about',
		canActivate: [AuthCanActivateGuard],
		loadChildren: async (): Promise<any> => import('./modules/about/about-page.module').then(m => m.AboutPageModule)
	},
	{path: '**', redirectTo: 'library'}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
	scrollPositionRestoration: 'enabled',
	relativeLinkResolution: 'legacy'
});
