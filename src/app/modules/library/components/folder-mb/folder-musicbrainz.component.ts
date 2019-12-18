import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-folder-musicbrainz',
	templateUrl: './folder-musicbrainz.component.html',
	styleUrls: ['./folder-musicbrainz.component.scss']
})
export class FolderMusicbrainzComponent implements OnInit, OnDestroy {
	folder: Jam.Folder;
	hasArtistID: boolean;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
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
		this.folder = undefined;
		this.hasArtistID = false;
		if (this.id) {
			this.jam.folder.id({id: this.id, folderTag: true})
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
		this.hasArtistID = folder && folder.tag && !!folder.tag.mbArtistID;
	}
}
