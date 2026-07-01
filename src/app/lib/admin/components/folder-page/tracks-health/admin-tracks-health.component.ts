import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { TrackHealthComponent } from '../../track-health/track-health.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';

@Component({
	selector: 'app-admin-tracks-health',
	templateUrl: './admin-tracks-health.component.html',
	styleUrls: ['./admin-tracks-health.component.scss'],
	imports: [BackgroundTextListComponent, FormsModule, IconReloadComponent, LoadingComponent, RouterModule, TrackHealthComponent]
})
export class AdminTracksHealthComponent extends AdminBaseParentViewIdComponent {
	readonly all = signal<Array<Jam.TrackHealth> | undefined>(undefined);
	readonly hints = signal<Array<Jam.TrackHealth> | undefined>(undefined);
	readonly modes = signal<Array<string>>([]);
	filter?: string;
	mediaCheck: boolean = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);

	constructor() {
		super();
		this.folderService.foldersChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(change => {
				if (change.id === this.id) {
					this.refresh();
				}
			});
	}

	checkChange(): void {
		this.refresh();
	}

	trackHealthResolved(health: Jam.TrackHealth): void {
		const all = this.all();
		if (!all) {
			return;
		}
		this.all.set(all.filter(h => h !== health));
		this.reDisplay();
	}

	override refresh(): void {
		this.hints.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.track.health({ folderIDs: [this.id], healthMedia: this.mediaCheck })
			.then(data => {
				this.display(data);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	private reDisplay(): void {
		const all = this.all();
		this.hints.set(!this.filter || !all ? all : all.filter(f => f.health.find(p => p.name === this.filter)));
	}

	private display(trackHealths: Array<Jam.TrackHealth>): void {
		this.all.set(trackHealths);
		const modes: Array<string> = [];
		for (const trackHealth of trackHealths) {
			for (const hint of trackHealth.health) {
				if (!modes.includes(hint.name)) {
					modes.push(hint.name);
				}
			}
		}
		this.modes.set(modes);
		this.reDisplay();
	}
}
