import { Component, DestroyRef, inject, signal, viewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FolderType, type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackHealthComponent } from '../track-health/track-health.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { UiStateService } from '@core/services/ui-state/ui-state.service';
import { UserStorageService } from '@core/services/userstorage/userstorage.service';
import { IconFolderComponent } from '@core/components/icons/icon-folder.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconReloadComponent } from '@core/components/icons/icon-reload.component';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { IconStopComponent } from '@core/components/icons/icon-stop.component';

type RadarCurrent = { pos: number; folder: Jam.Folder; health?: Array<Jam.TrackHealth> };

@Component({
	selector: 'app-admin-radar',
	templateUrl: './admin-radar.component.html',
	styleUrls: ['./admin-radar.component.scss'],
	imports: [HeaderSlimComponent, IconFolderComponent, IconPlayComponent, IconReloadComponent, IconSpinComponent, IconStopComponent, LoadingComponent, RouterModule, TrackHealthComponent]
})
export class AdminRadarComponent {
	static readonly localStorageName = 'admin.radar';
	readonly folders = signal<Array<Jam.Folder> | undefined>(undefined);
	readonly current = signal<RadarCurrent | undefined>(undefined);
	readonly searching = signal(false);
	private readonly trackHealthComponents = viewChildren(TrackHealthComponent);
	private readonly lifeRef = inject(DestroyRef);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly uiState = inject(UiStateService);
	private readonly userStorage = inject(UserStorageService);

	constructor() {
		const restore = this.uiState.get<{ folders?: Array<Jam.Folder>; current?: RadarCurrent }>('app-admin-radar', {});
		this.folders.set(restore.folders);
		this.current.set(restore.current);
		if (!restore.folders) {
			this.loadFolders();
		}
		this.userStorage.userChange
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.loadFromStorage();
			});
		this.lifeRef.onDestroy(() => {
			this.uiState.data['app-admin-radar'] = { folders: this.folders(), current: this.current() };
		});
	}

	trackHealthResolved(health: Jam.TrackHealth): void {
		this.current.update(c => c?.health ? { ...c, health: c.health.filter(h => h !== health) } : c);
	}

	stop(): void {
		this.searching.set(false);
	}

	start(): void {
		if (this.searching() || !this.folders()) {
			return;
		}
		this.searching.set(true);
		this.request();
	}

	request(): void {
		if (!this.searching()) {
			return;
		}
		const current = this.current();
		this.refresh(current ? current.pos + 1 : 0, true);
	}

	fixAll(): void {
		if (this.searching() || !this.current()) {
			return;
		}
		for (const trackHealthComponent of this.trackHealthComponents()) {
			trackHealthComponent.fixAll();
		}
	}

	refresh(pos: number, continueNext: boolean): void {
		this.current.set(undefined);
		this.searching.set(true);
		const folder = this.folders()?.[pos];
		if (!folder) {
			this.searching.set(false);
			return;
		}
		const current: RadarCurrent = { folder, pos };
		this.current.set(current);
		this.userStorage.set(AdminRadarComponent.localStorageName, { folderID: folder.id });
		this.jam.track.health({ folderIDs: [folder.id], healthMedia: true })
			.then(health => {
				if (health.length > 0) {
					this.current.set({ ...current, health });
					this.searching.set(false);
				} else if (continueNext) {
					this.request();
				} else {
					this.current.set({ ...current, health: [] });
					this.searching.set(false);
				}
			})
			.catch((error: unknown) => {
				this.current.set(undefined);
				this.searching.set(false);
				this.notify.error(error);
			});
	}

	loadFromStorage(): void {
		const o = this.userStorage.get<{ folderID: string }>(AdminRadarComponent.localStorageName);
		const folders = this.folders();
		if (o?.folderID && folders) {
			const pos = folders.findIndex(f => f.id === o.folderID);
			if (pos !== -1) {
				this.current.set({ folder: folders[pos], pos });
				this.refresh(pos, false);
			}
		}
	}

	loadFolders(): void {
		this.jam.folder.search({ folderTypes: [FolderType.album, FolderType.multialbum] })
			.then(data => {
				this.folders.set(data.items);
				this.loadFromStorage();
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
