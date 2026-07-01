import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { IconFloppyComponent } from '@core/components/icons/icon-floppy.component';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss'],
	imports: [FormsModule, HeaderSlimComponent, IconFloppyComponent, LoadingComponent, RouterModule]
})
export class AdminSettingsComponent {
	readonly settings = signal<Jam.AdminSettings | undefined>(undefined);
	ignoreArticles: string = '';
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		this.refresh();
	}

	onChange(): void {
		// future usage
	}

	refresh(): void {
		this.jam.admin.settings()
			.then(data => {
				this.display(data);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	save(): void {
		const settings = this.settings();
		if (!settings) {
			return;
		}
		settings.index.ignoreArticles = this.ignoreArticles.split('\n').map(s => s.trim()).filter(s => s.length > 0);
		this.settings.set(undefined);
		this.jam.admin.settingsUpdate(settings)
			.then(() => {
				this.notify.success('Settings updated');
				this.settings.set(settings);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
				this.settings.set(settings);
			});
	}

	private display(data: Jam.AdminSettings): void {
		this.ignoreArticles = data.index.ignoreArticles.join('\n');
		this.settings.set(data);
	}
}
