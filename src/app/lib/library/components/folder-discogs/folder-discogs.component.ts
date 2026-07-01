import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { FolderType, type Jam, JamService } from '@jam';
import { DiscogsAlbumComponent } from '../discogs-album/discogs-album.component';
import { DiscogsArtistComponent } from '../discogs-artist/discogs-artist.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-folder-discogs',
	templateUrl: './folder-discogs.component.html',
	imports: [DiscogsAlbumComponent, DiscogsArtistComponent, BackgroundTextComponent, LoadingComponent]
})
export class FolderDiscogsComponent {
	readonly folder = signal<Jam.Folder | undefined>(undefined);
	protected readonly FolderType = FolderType;
	private id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					this.refresh();
				});
		}
	}

	refresh(): void {
		this.folder.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.folder.id({ id: this.id, folderIncTag: true })
			.then(folder => {
				this.folder.set(folder);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
