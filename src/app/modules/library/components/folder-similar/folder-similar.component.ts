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
	selector: 'app-folder-similar',
	templateUrl: './folder-similar.component.html',
	styleUrls: ['./folder-similar.component.scss']
})
export class FolderSimilarComponent implements OnInit, OnDestroy {
	id: string;
	similarFolders: Array<JamFolderObject>;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private library: LibraryService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.parent.params
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
		this.similarFolders = undefined;
		if (this.id) {
			this.jam.folder.artist_similar({
				id: this.id,
				folderState: true,
				folderTag: true
			})
				.then(folders => {
					this.display(folders);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	display(folders: Jam.FolderList): void {
		this.similarFolders = folders.items.map(o => new JamFolderObject(o, this.library));
	}
}
