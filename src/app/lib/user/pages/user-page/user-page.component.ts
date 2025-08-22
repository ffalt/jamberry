import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JamAuthService } from '@jam';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';
import { UserStatsComponent } from '../../components/user-stats/user-stats.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	imports: [CommonModule, UserAvatarComponent, UserStatsComponent, HeaderSlimComponent]
})
export class UserPageComponent {
	readonly auth = inject(JamAuthService);
}
