import {AdminBaseParentViewIdComponent} from '@admin/components/admin-base-parent-view-id/admin-base-parent-view-id.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-tracks-health',
	templateUrl: 'admin-tracks-health.component.html',
	styleUrls: ['admin-tracks-health.component.scss']
})

export class AdminTracksHealthComponent extends AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	all: Array<Jam.TrackHealth>;
	hints: Array<Jam.TrackHealth>;
	id: string;
	filter: string;
	modes: Array<string> = [];
	mediaCheck: boolean = false;

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
		this.jam.track.health({parentID: this.id, media: this.mediaCheck})
			.then(data => {
				this.display(data);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private reDisplay(): void {
		this.hints = !this.filter ?
			this.all.slice(0) :
			this.all.filter(f => f.health && f.health.find(p => p.name === this.filter));
	}

	private display(trackHealths: Array<Jam.TrackHealth>): void {
		this.all = trackHealths;
		this.modes = [];
		for (const trackHealth of trackHealths) {
			if (trackHealth.health) {
				for (const hint of trackHealth.health) {
					if (!this.modes.includes(hint.name)) {
						this.modes.push(hint.name);
					}
				}
			}
		}
		this.reDisplay();
	}
}
