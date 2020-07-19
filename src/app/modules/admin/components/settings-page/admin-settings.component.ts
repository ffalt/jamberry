import {Component, OnInit} from '@angular/core';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss']
})

export class AdminSettingsComponent implements OnInit {
	settings: Jam.AdminSettings;
	ignoreArticles: string;

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

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
			.catch(e => {
				this.notify.error(e);
			});
	}

	save(): void {
		const settings = this.settings;
		settings.index.ignoreArticles = this.ignoreArticles.split('\n').map(s => s.trim()).filter(s => s.length > 0);
		this.settings = undefined;
		this.jam.admin.settingsUpdate(settings)
			.then(() => {
				this.notify.success('Settings updated');
				this.settings = settings;
			})
			.catch(e => {
				this.notify.error(e);
				this.settings = settings;
			});
	}

	private display(settings: Jam.AdminSettings): void {
		this.settings = settings;
		this.ignoreArticles = settings.index.ignoreArticles.join('\n');
	}

}
