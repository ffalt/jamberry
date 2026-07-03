import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { MbArtistComponent } from '../mb-artist/mb-artist.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-artist-mb',
	templateUrl: './artist-mb.component.html',
	styleUrls: ['./artist-mb.component.scss'],
	imports: [MbArtistComponent, BackgroundTextComponent, LoadingComponent]
})
export class ArtistMbComponent {
	readonly artist = signal<Jam.Artist | undefined>(undefined);
	readonly mbArtistID = computed(() => this.artist()?.mbArtistID);
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
		this.artist.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.artist.id({ id: this.id })
			.then(artist => {
				this.artist.set(artist);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
