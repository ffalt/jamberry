import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { MbArtistComponent } from '../mb-artist/mb-artist.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-folder-musicbrainz',
	templateUrl: './folder-musicbrainz.component.html',
	styleUrls: ['./folder-musicbrainz.component.scss'],
	imports: [MbArtistComponent, BackgroundTextComponent, LoadingComponent]
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
		this.folder = undefined;
		this.hasArtistID = false;
		if (this.id) {
			this.jam.folder.id({ id: this.id, folderIncTag: true })
				.then(folder => {
					this.display(folder);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	display(folder?: Jam.Folder): void {
		this.folder = folder;
		this.hasArtistID = !!folder?.tag?.mbArtistID;
	}
}
