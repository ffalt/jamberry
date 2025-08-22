import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { JamFolderObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { LibraryService } from '../../services/library/library.service';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-folder-similar',
	templateUrl: './folder-similar.component.html',
	styleUrls: ['./folder-similar.component.scss'],
	imports: [ObjGroupsViewComponent, LoadingComponent]
})
export class FolderSimilarComponent implements OnInit, OnDestroy {
	id?: string;
	similarFolders?: Array<JamFolderObject>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					this.refresh();
				});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.similarFolders = undefined;
		if (this.id) {
			this.jam.folder.artistsSimilar({
				id: this.id,
				folderIncState: true,
				folderIncTag: true
			})
				.then(folders => {
					this.display(folders);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	display(folders: Jam.FolderPage): void {
		this.similarFolders = folders.items.map(o => new JamFolderObject(o, this.library));
	}
}
