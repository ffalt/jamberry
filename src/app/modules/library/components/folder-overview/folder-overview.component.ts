import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {JamFolderObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-folder-overview',
	templateUrl: './folder-overview.component.html',
	styleUrls: ['./folder-overview.component.scss']
})
export class FolderOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	folder?: Jam.Folder;
	childFolders?: Array<JamFolderObject>;
	protected unsubscribe = new Subject<void>();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private library: LibraryService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
	}

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
				.then(folder => {
					this.display(folder);
				})
				.catch(e => {
					this.notify.error(e);
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
