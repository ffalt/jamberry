import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, type Jam, JamService } from '@jam';
import { TrackListComponent } from '../track-list/track-list.component';
import { InfoNoteComponent } from '@core/components/info-note/info-note.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-album-overview',
	templateUrl: './album-overview.component.html',
	styleUrls: ['./album-overview.component.scss'],
	imports: [TrackListComponent, InfoNoteComponent, LoadingComponent]
})
export class AlbumOverviewComponent {
	readonly album = signal<Jam.Album | undefined>(undefined);
	readonly tracks = computed(() => this.album()?.tracks ?? []);
	readonly isCompilation = computed(() => this.album()?.albumType === AlbumType.compilation);
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
		this.jam.album.id({
			id: this.id,
			trackIncState: true,
			trackIncTag: true,
			albumIncGenres: true,
			albumIncTracks: true,
			albumIncInfo: true
		})
			.then(album => {
				this.album.set(album);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
