import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
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
export class FolderOverviewComponent implements OnInit, OnDestroy {
	readonly navig = inject(NavigService);
	id?: string;
	folder?: Jam.Folder;
	childFolders?: Array<JamFolderObject>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.folder = undefined;
		if (this.id) {
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
					this.display(folder);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	display(folder: Jam.Folder): void {
		this.folder = folder;
		this.childFolders = undefined;
		if (this.folder.folders && this.folder.folders.length > 0) {
			this.childFolders = this.folder.folders.map(o => new JamFolderObject(o, this.library));
		}
	}
}
