import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { JamFolderObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { LibraryService } from '../../services/library/library.service';
import { InfoNoteComponent } from '@core/components/info-note/info-note.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NavigService } from '@core/services/navig/navig.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-folder-overview',
	templateUrl: './folder-overview.component.html',
	styleUrls: ['./folder-overview.component.scss'],
	imports: [TrackListComponent, ObjGroupsViewComponent, InfoNoteComponent, LoadingComponent]
})
export class FolderOverviewComponent {
	readonly navig = inject(NavigService);
	readonly folder = signal<Jam.Folder | undefined>(undefined);
	readonly childFolders = computed(() => {
		const folders = this.folder()?.folders;
		return folders?.length ? folders.map(o => new JamFolderObject(o, this.library)) : undefined;
	});

	private id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);
	private readonly library = inject(LibraryService);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	refresh(): void {
		this.folder.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.folder.id({
			id: this.id,
			trackIncState: true,
			trackIncTag: true,
			folderIncParents: true,
			folderIncState: true,
			folderIncTag: true,
			folderIncChildren: true,
			folderIncInfo: true,
			folderChildIncTag: true,
			folderChildIncState: true
		})
			.then(folder => {
				this.folder.set(folder);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
