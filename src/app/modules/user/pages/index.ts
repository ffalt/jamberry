import {SessionsPageComponent} from './sessions-page/sessions-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {UserPageComponent} from './user-page/user-page.component';

export const pages: Array<any> = [
	UserPageComponent, SettingsPageComponent, SessionsPageComponent
];

export * from './sessions-page/sessions-page.component';
export * from './settings-page/settings-page.component';
export * from './user-page/user-page.component';
