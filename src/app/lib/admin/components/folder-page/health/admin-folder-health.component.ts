import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntil } from 'rxjs';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { FolderHealthComponent } from '../../folder-health/folder-health.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';

@Component({
	selector: 'app-admin-folder-health',
	templateUrl: './admin-folder-health.component.html',
	styleUrls: ['./admin-folder-health.component.scss'],
	imports: [RouterModule, FormsModule, FolderHealthComponent, BackgroundTextListComponent, LoadingComponent]
})
export class AdminFolderHealthComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	all?: Array<Jam.FolderHealth>;
	hints?: Array<Jam.FolderHealth>;
	filter?: string;
	modes: Array<string> = [];
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);

	onFilterChange(): void {
		this.reDisplay();
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(change => {
				this.processChange(change.id);
			});
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	processChange(id: string): void {
		if (id === this.id) {
			this.refresh();
		} else if (this.all) {
			const folderHealth = this.all.find(f => f.folder.id === id);
			if (folderHealth) {
				this.jam.folder.health({ ids: [id], folderIncTag: true })
					.then(data => {
						if (this.all) {
							const newFolderHealth = data.find(d => d.folder.id === folderHealth.folder.id);
							if (newFolderHealth) {
								this.all[this.all.indexOf(folderHealth)] = newFolderHealth;
							} else {
								this.all = this.all.filter(fh => fh.folder.id !== folderHealth.folder.id);
							}
						}
						this.reDisplay();
					})
					.catch((error: unknown) => {
						this.notify.error(error);
					});
			}
		}
	}

	refresh(): void {
		this.hints = undefined;
		this.jam.folder.health({ childOfID: this.id, folderIncTag: true })
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

	private display(folderHealths: Array<Jam.FolderHealth>): void {
		this.all = folderHealths;
		this.modes = [];
		for (const folderHealth of folderHealths) {
			for (const hint of folderHealth.health) {
				if (!this.modes.includes(hint.name)) {
					this.modes.push(hint.name);
				}
			}
		}
		this.reDisplay();
	}
}
