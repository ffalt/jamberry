import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import {JamFolderObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
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
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		if (this.route?.parent) {
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
