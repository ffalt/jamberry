import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntil } from 'rxjs';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { TrackHealthComponent } from '../../track-health/track-health.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-admin-tracks-health',
	templateUrl: './admin-tracks-health.component.html',
	styleUrls: ['./admin-tracks-health.component.scss'],
	imports: [CommonModule, RouterModule, FormsModule, TrackHealthComponent, BackgroundTextListComponent, LoadingComponent]
})

export class AdminTracksHealthComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	all?: Array<Jam.TrackHealth>;
	hints?: Array<Jam.TrackHealth>;
	filter?: string;
	modes: Array<string> = [];
	mediaCheck: boolean = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);

	ngOnInit(): void {
		super.ngOnInit();
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(change => {
				if (change.id === this.id) {
					this.refresh();
				}
			});
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	checkChange(): void {
		this.refresh();
	}

	trackHealthResolved(health: Jam.TrackHealth): void {
		if (this.all) {
			this.all = this.all.filter(h => h !== health);
			this.reDisplay();
		}
	}

	refresh(): void {
		this.hints = undefined;
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
		this.hints = !this.filter || !this.all ?
			this.all :
			this.all.filter(f => f.health.find(p => p.name === this.filter));
	}

	private display(trackHealths: Array<Jam.TrackHealth>): void {
		this.all = trackHealths;
		this.modes = [];
		for (const trackHealth of trackHealths) {
			for (const hint of trackHealth.health) {
				if (!this.modes.includes(hint.name)) {
					this.modes.push(hint.name);
				}
			}
		}
		this.reDisplay();
	}
}
