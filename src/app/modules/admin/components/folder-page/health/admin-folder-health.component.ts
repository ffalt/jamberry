import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {AdminFolderService, NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs';

@Component({
	selector: 'app-admin-folder-health',
	templateUrl: './admin-folder-health.component.html',
	styleUrls: ['./admin-folder-health.component.scss'],
	standalone: false
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
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
				if (change.id === this.id) {
					this.refresh();
				} else if (this.all) {
					const folderHealth = this.all.find(f => f.folder.id === change.id);
					if (folderHealth) {
						this.jam.folder.health({ids: [change.id], folderIncTag: true})
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
							.catch(error => this.notify.error(error));
					}
				}
			}
		);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	refresh(): void {
		this.hints = undefined;
		this.jam.folder.health({childOfID: this.id, folderIncTag: true})
			.then(data => this.display(data))
			.catch(error => this.notify.error(error));
	}

	private reDisplay(): void {
		this.hints = !this.filter || !this.all ?
			this.all :
			this.all.filter(f => f.health?.find(p => p.name === this.filter));
	}

	private display(folderHealths: Array<Jam.FolderHealth>): void {
		this.all = folderHealths;
		this.modes = [];
		for (const folderHealth of folderHealths) {
			if (folderHealth.health) {
				for (const hint of folderHealth.health) {
					if (!this.modes.includes(hint.name)) {
						this.modes.push(hint.name);
					}
				}
			}
		}
		this.reDisplay();
	}
}
