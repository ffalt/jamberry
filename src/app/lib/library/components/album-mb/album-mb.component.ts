import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { MbAlbumComponent } from '../mb-album/mb-album.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-album-mb',
	templateUrl: './album-mb.component.html',
	styleUrls: ['./album-mb.component.scss'],
	imports: [MbAlbumComponent, BackgroundTextComponent, LoadingComponent]
})
export class AlbumMbComponent {
	readonly album = signal<Jam.Album | undefined>(undefined);
	readonly mbReleaseID = computed(() => this.album()?.mbReleaseID);
	private id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	refresh(): void {
		this.album.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.album.id({ id: this.id })
			.then(album => {
				this.album.set(album);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
