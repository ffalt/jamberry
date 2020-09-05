import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {themeConfig} from '@app/app.module';

import {AppService, PlayerService, SettingsStoreService} from '@core/services';

@Component({
	selector: 'app-page-settings',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
	themes = themeConfig.themes;

	constructor(private router: Router, public app: AppService, private settings: SettingsStoreService, public player: PlayerService) {
	}

	onChange(): void {
		this.settings.applySettings();
	}

}
