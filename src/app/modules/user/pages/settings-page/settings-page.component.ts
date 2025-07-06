import {Component, inject} from '@angular/core';
import {themeConfig} from '@app/app.module';

import {AppService, PlayerService, SettingsStoreService} from '@core/services';

@Component({
	selector: 'app-page-settings',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss'],
	standalone: false
})
export class SettingsPageComponent {
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	readonly themes = themeConfig.themes;
	private readonly settings = inject(SettingsStoreService);

	onChange(): void {
		this.settings.applySettings();
	}
}
