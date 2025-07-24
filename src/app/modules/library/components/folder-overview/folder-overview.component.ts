import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import {JamFolderObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-folder-overview',
	templateUrl: './folder-overview.component.html',
	styleUrls: ['./folder-overview.component.scss'],
	standalone: false
})
export class FolderOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	folder?: Jam.Folder;
	childFolders?: Array<JamFolderObject>;
	readonly navig = inject(NavigService);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
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
				.then(folder => this.display(folder))
				.catch(error => this.notify.error(error));
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
