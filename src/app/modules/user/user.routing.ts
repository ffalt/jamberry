import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthCanActivateGuard} from '@app/guards';
import {SessionsPageComponent} from './pages/sessions-page/sessions-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {UserComponent} from './user.component';

export const routes: Routes = [
	{
		path: '', component: UserComponent,
		children: [
			{path: '', pathMatch: 'full', component: UserPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'User'}},
			{path: 'settings', component: SettingsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Settings'}},
			{path: 'sessions', component: SessionsPageComponent, canActivate: [AuthCanActivateGuard], data: {name: 'Sessions'}}
		]
	}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
