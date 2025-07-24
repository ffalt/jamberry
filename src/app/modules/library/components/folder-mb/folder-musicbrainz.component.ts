import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-folder-musicbrainz',
	templateUrl: './folder-musicbrainz.component.html',
	styleUrls: ['./folder-musicbrainz.component.scss'],
	standalone: false
})
export class FolderMusicbrainzComponent implements OnInit, OnDestroy {
	folder?: Jam.Folder;
	id?: string;
	hasArtistID: boolean = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

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
		this.folder = undefined;
		this.hasArtistID = false;
		if (this.id) {
			this.jam.folder.id({id: this.id, folderIncTag: true})
				.then(folder => this.display(folder))
				.catch(error => this.notify.error(error));
		}
	}

	display(folder: Jam.Folder): void {
		this.folder = folder;
		this.hasArtistID = !!folder?.tag?.mbArtistID;
	}
}
