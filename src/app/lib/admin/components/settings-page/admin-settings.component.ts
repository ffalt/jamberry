import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss'],
	imports: [RouterModule, FormsModule, LoadingComponent, HeaderSlimComponent]
})

export class AdminSettingsComponent implements OnInit {
	settings?: Jam.AdminSettings;
	ignoreArticles: string = '';
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnInit(): void {
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
		const settings = this.settings;
		if (!settings) {
			return;
		}
		settings.index.ignoreArticles = this.ignoreArticles.split('\n').map(s => s.trim()).filter(s => s.length > 0);
		this.settings = undefined;
		this.jam.admin.settingsUpdate(settings)
			.then(() => {
				this.notify.success('Settings updated');
				this.settings = settings;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
				this.settings = settings;
			});
	}

	private display(settings: Jam.AdminSettings): void {
		this.settings = settings;
		this.ignoreArticles = settings.index.ignoreArticles.join('\n');
	}
}
