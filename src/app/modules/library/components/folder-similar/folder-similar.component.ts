import {Component, OnDestroy, OnInit, inject} from '@angular/core';
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
	styleUrls: ['./folder-similar.component.scss'],
	standalone: false
})
export class FolderSimilarComponent implements OnInit, OnDestroy {
	id?: string;
	similarFolders?: Array<JamFolderObject>;
	readonly navig = inject(NavigService);
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
	protected readonly jam = inject(JamService);
	protected readonly notify = inject(NotifyService);
	protected readonly route = inject(ActivatedRoute);
	protected readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

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
			this.jam.folder.artistsSimilar({
				id: this.id,
				folderIncState: true,
				folderIncTag: true
			})
				.then(folders => {
					this.display(folders);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	display(folders: Jam.FolderPage): void {
		this.similarFolders = folders.items.map(o => new JamFolderObject(o, this.library));
	}
}
