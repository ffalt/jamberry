import {UserStatsComponent} from './user-stats/user-stats.component';
import {UserAvatarComponent} from './user-avatar/user-avatar.component';
import {UserSidebarComponent} from './user-sidebar/user-sidebar.component';

export const components: Array<any> = [
	UserSidebarComponent,
	UserStatsComponent,
	UserAvatarComponent
];

export * from './user-sidebar/user-sidebar.component';
export * from './user-avatar/user-avatar.component';
export * from './user-stats/user-stats.component';
