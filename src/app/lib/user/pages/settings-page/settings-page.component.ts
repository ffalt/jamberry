import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { themeConfig } from '../../../../app.providers';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { AppService } from '@core/services/app/app.service';
import { PlayerService } from '@core/services/player/player.service';
import { SettingsStoreService } from '@core/services/settings-store/settings-store.service';

@Component({
	selector: 'app-page-settings',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss'],
	imports: [CommonModule, FormsModule, HeaderSlimComponent]
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
