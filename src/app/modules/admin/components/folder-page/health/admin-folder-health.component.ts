import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-folder-health',
	templateUrl: './admin-folder-health.component.html',
	styleUrls: ['./admin-folder-health.component.scss']
})
export class AdminFolderHealthComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	all?: Array<Jam.FolderHealth>;
	hints?: Array<Jam.FolderHealth>;
	filter?: string;
	modes: Array<string> = [];
	public: any;

	constructor(route: ActivatedRoute, private app: AppService, private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService) {
		super(route);
	}

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
							.catch(e => {
								this.notify.error(e);
							});
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
			.then(data => {
				this.display(data);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private reDisplay(): void {
		this.hints = !this.filter || !this.all ?
			this.all :
			this.all.filter(f => f.health && f.health.find(p => p.name === this.filter));
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
