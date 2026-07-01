import { Component } from '@angular/core';
import { injectUser } from '@core/services/user/user.service';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';
import { UserStatsComponent } from '../../components/user-stats/user-stats.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { IconCheckmarkComponent } from '@core/components/icons/icon-checkmark.component';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	imports: [HeaderSlimComponent, IconCheckmarkComponent, UserAvatarComponent, UserStatsComponent]
})
export class UserPageComponent {
	readonly user = injectUser();
}
