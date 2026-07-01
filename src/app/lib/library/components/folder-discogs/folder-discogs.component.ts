import { Component, inject, type OnDestroy, type OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { FolderType, type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { DiscogsAlbumComponent } from '../discogs-album/discogs-album.component';
import { DiscogsArtistComponent } from '../discogs-artist/discogs-artist.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-folder-discogs',
	templateUrl: './folder-discogs.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [DiscogsAlbumComponent, DiscogsArtistComponent, BackgroundTextComponent, LoadingComponent]
})
export class FolderDiscogsComponent implements OnInit, OnDestroy {
	folder?: Jam.Folder;
	id?: string;
	protected readonly FolderType = FolderType;
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
		if (!this.id) {
			return;
		}
		this.jam.folder.id({ id: this.id, folderIncTag: true })
			.then(folder => {
				this.folder = folder;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
