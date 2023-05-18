import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {themeConfig} from '@app/app.module';
import {Theme} from '@app/modules/theme/theme.model';

import {AppService, PlayerService, SettingsStoreService} from '@core/services';

@Component({
	selector: 'app-page-settings',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
	themes = themeConfig.themes;
	public: any;

	constructor(private router: Router, public app: AppService, private settings: SettingsStoreService, public player: PlayerService) {
	}

	trackByThemeFn(index: number, value: Theme): string {
		return value.name;
	}

	onChange(): void {
		this.settings.applySettings();
	}

}
