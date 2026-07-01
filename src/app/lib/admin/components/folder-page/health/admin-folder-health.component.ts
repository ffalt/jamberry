import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminBaseParentViewIdComponent } from '../../admin-base-parent-view-id/admin-base-parent-view-id.component';
import { FolderHealthComponent } from '../../folder-health/folder-health.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';

@Component({
	selector: 'app-admin-folder-health',
	templateUrl: './admin-folder-health.component.html',
	styleUrls: ['./admin-folder-health.component.scss'],
	imports: [BackgroundTextListComponent, FolderHealthComponent, FormsModule, IconReloadComponent, LoadingComponent, RouterModule]
})
export class AdminFolderHealthComponent extends AdminBaseParentViewIdComponent {
	readonly all = signal<Array<Jam.FolderHealth> | undefined>(undefined);
	readonly hints = signal<Array<Jam.FolderHealth> | undefined>(undefined);
	readonly modes = signal<Array<string>>([]);
	filter?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);

	constructor() {
		super();
		this.folderService.foldersChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(change => {
				this.processChange(change.id);
			});
	}

	onFilterChange(): void {
		this.reDisplay();
	}

	processChange(id: string): void {
		if (id === this.id) {
			this.refresh();
			return;
		}
		const all = this.all();
		const folderHealth = all?.find(f => f.folder.id === id);
		if (!folderHealth) {
			return;
		}
		this.jam.folder.health({ ids: [id], folderIncTag: true })
			.then(data => {
				const currentAll = this.all();
				if (!currentAll) {
					return;
				}
				const newFolderHealth = data.find(d => d.folder.id === folderHealth.folder.id);
				if (newFolderHealth) {
					const updated = [...currentAll];
					updated[updated.indexOf(folderHealth)] = newFolderHealth;
					this.all.set(updated);
				} else {
					this.all.set(currentAll.filter(fh => fh.folder.id !== folderHealth.folder.id));
				}
				this.reDisplay();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	override refresh(): void {
		if (!this.id) {
			return;
		}
		this.hints.set(undefined);
		this.jam.folder.health({ inSubtreeOfID: this.id, folderIncTag: true })
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

	private display(folderHealths: Array<Jam.FolderHealth>): void {
		this.all.set(folderHealths);
		const modes: Array<string> = [];
		for (const folderHealth of folderHealths) {
			for (const hint of folderHealth.health) {
				if (!modes.includes(hint.name)) {
					modes.push(hint.name);
				}
			}
		}
		this.modes.set(modes);
		this.reDisplay();
	}
}
