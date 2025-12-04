import { Component, inject, type OnDestroy, type OnInit, viewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FolderType, type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { TrackHealthComponent } from '../track-health/track-health.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { UiStateService } from '@core/services/ui-state/ui-state.service';
import { UserStorageService } from '@core/services/userstorage/userstorage.service';

@Component({
	selector: 'app-admin-radar',
	templateUrl: './admin-radar.component.html',
	styleUrls: ['./admin-radar.component.scss'],
	imports: [RouterModule, TrackHealthComponent, LoadingComponent, HeaderSlimComponent]
})

export class AdminRadarComponent implements OnInit, OnDestroy {
	static readonly localStorageName = 'admin.radar';
	folders?: Array<Jam.Folder>;
	current?: { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> };
	searching: boolean = false;
	private readonly trackHealthComponents = viewChildren(TrackHealthComponent);
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly uiState = inject(UiStateService);
	private readonly userStorage = inject(UserStorageService);

	constructor() {
		this.userStorage.userChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.loadFromStorage();
			});
	}

	trackHealthResolved(health: Jam.TrackHealth): void {
		if (this.current?.health) {
			this.current.health = this.current.health.filter(h => h !== health);
		}
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
		const trackHealthComponents = this.trackHealthComponents();
		if (this.searching || !this.current) {
			return;
		}
		for (const trackHealthComponent of trackHealthComponents) {
			trackHealthComponent.fixAll();
		}
	}

	refresh(pos: number, continueNext: boolean): void {
		this.current = undefined;
		this.searching = true;
		const folder = this.folders?.[pos];
		if (!folder) {
			this.searching = false;
			return;
		}
		const current: { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> } = {
			folder,
			pos
		};
		this.current = current;
		this.userStorage.set(AdminRadarComponent.localStorageName, { folderID: folder.id });
		this.jam.track.health({ folderIDs: [folder.id], healthMedia: true })
			.then(health => {
				if (health.length > 0) {
					current.health = health;
					this.searching = false;
				} else if (continueNext) {
					this.request();
				} else {
					current.health = [];
					this.searching = false;
				}
			})
			.catch((error: unknown) => {
				this.current = undefined;
				this.searching = false;
				this.notify.error(error);
			});
	}

	ngOnInit(): void {
		const restore = this.uiState.get<{
			folders?: Array<Jam.Folder>;
			current?: { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> };
		}>('app-admin-radar', {});
		this.folders = restore.folders;
		this.current = restore.current;
		if (this.folders) {
			return;
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
			if (pos !== -1) {
				this.current = { folder: this.folders[pos], pos };
				this.refresh(pos, false);
			}
		}
	}

	loadFolders(): void {
		this.jam.folder.search({ folderTypes: [FolderType.album, FolderType.multialbum] })
			.then(data => {
				this.folders = data.items;
				this.loadFromStorage();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
