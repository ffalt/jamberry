import {TrackHealthComponent} from '@admin/components/track-health/track-health.component';
import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AdminFolderService, AppService, NotifyService, UiStateService, UserStorageService} from '@core/services';
import {FolderType, Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-radar',
	templateUrl: './admin-radar.component.html',
	styleUrls: ['./admin-radar.component.scss']
})

export class AdminRadarComponent implements OnInit, OnDestroy {
	static localStorageName = 'admin.radar';
	folders?: Array<Jam.Folder>;
	current?: { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> };
	searching: boolean = false;
	@ViewChildren(TrackHealthComponent) trackHealthComponents!: QueryList<TrackHealthComponent>;
	protected unsubscribe = new Subject<void>();

	constructor(
		private app: AppService, private jam: JamService, private notify: NotifyService, private uiState: UiStateService, private folderService: AdminFolderService,
		private userStorage: UserStorageService
	) {
		userStorage.userChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
			this.loadFromStorage();
		});
	}

	trackHealthResolved(health: Jam.TrackHealth): void {
		if (this.current && this.current.health) {
			this.current.health = this.current.health.filter(h => h !== health);
		}
	}

	trackByFn(index: number, health: Jam.TrackHealth): string {
		return health.track.id;
	}

	stop(): void {
		this.searching = false;
	}

	start(): void {
		if (this.searching || !this.folders) {
			return;
		}
		this.searching = true;
		this.request();
	}

	request(): void {
		if (!this.searching) {
			return;
		}
		let pos = 0;
		if (this.current) {
			pos = this.current.pos + 1;
		}
		this.refresh(pos, true);
	}

	fixAll(): void {
		if (this.searching || !this.current || !this.trackHealthComponents) {
			return;
		}
		this.trackHealthComponents.forEach(trackHealthComponent => {
			trackHealthComponent.fixAll();
		});
	}

	refresh(pos: number, continueNext: boolean): void {
		this.current = undefined;
		this.searching = true;
		const folder = this.folders && this.folders[pos];
		if (!folder) {
			this.searching = false;
			return;
		}
		const current: { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> } = {
			folder,
			pos
		};
		this.current = current;
		this.userStorage.set<{ folderID: string }>(AdminRadarComponent.localStorageName, {folderID: folder.id});
		this.jam.track.health({folderIDs: [folder.id], healthMedia: true})
			.then(health => {
				if (health.length > 0) {
					current.health = health;
					this.searching = false;
				} else if (!continueNext) {
					current.health = [];
					this.searching = false;
				} else {
					this.request();
				}
			})
			.catch(e => {
				this.current = undefined;
				this.searching = false;
				this.notify.error(e);
			});
	}

	ngOnInit(): void {
		const restore = this.uiState.data['app-admin-radar'];
		if (restore) {
			this.folders = restore.folders;
			this.current = restore.current;
			if (this.folders) {
				return;
			}
		}
		this.loadFolders();
	}

	ngOnDestroy(): void {
		this.uiState.data['app-admin-radar'] = {
			folders: this.folders,
			current: this.current
		};
		this.current = undefined;
		this.searching = false;
		this.folders = undefined;
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	loadFromStorage(): void {
		const o = this.userStorage.get<{ folderID: string }>(AdminRadarComponent.localStorageName);
		if (o?.folderID && this.folders) {
			const pos = this.folders.findIndex(f => f.id === o.folderID);
			if (pos >= 0) {
				this.current = {folder: this.folders[pos], pos};
				this.refresh(pos, false);
			}
		}
	}

	loadFolders(): void {
		this.jam.folder.search({folderTypes: [FolderType.album, FolderType.multialbum]})
			.then(data => {
				this.folders = data.items;
				this.loadFromStorage();
			}).catch(e => {
			this.notify.error(e);
		});
	}

}
