import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { DiscogsArtistComponent } from '../discogs-artist/discogs-artist.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-artist-discogs',
	templateUrl: './artist-discogs.component.html',
	imports: [DiscogsArtistComponent, LoadingComponent]
})
export class ArtistDiscogsComponent {
	readonly artist = signal<Jam.Artist | undefined>(undefined);

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
			.then(a => {
				this.artist.set(a);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
