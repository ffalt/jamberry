import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { JamAuthService } from '@jam';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';
import { UserStatsComponent } from '../../components/user-stats/user-stats.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { IconCheckmarkComponent } from '@core/components/icons/icon-checkmark.component';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [HeaderSlimComponent, IconCheckmarkComponent, UserAvatarComponent, UserStatsComponent]
})
export class UserPageComponent {
	readonly auth = inject(JamAuthService);
}
