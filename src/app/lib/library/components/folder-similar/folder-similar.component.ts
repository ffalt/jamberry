import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
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
export class FolderSimilarComponent {
	readonly similarFolders = signal<Array<JamFolderObject> | undefined>(undefined);
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
		this.similarFolders.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.folder.artistsSimilar({
			id: this.id,
			folderIncState: true,
			folderIncTag: true
		})
			.then(folders => {
				this.similarFolders.set(folders.items.map(o => new JamFolderObject(o, this.library)));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
