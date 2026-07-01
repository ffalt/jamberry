import { Component, inject, type OnDestroy, type OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { DiscogsArtistComponent } from '../discogs-artist/discogs-artist.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-artist-discogs',
	templateUrl: './artist-discogs.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [DiscogsArtistComponent, LoadingComponent]
})
export class ArtistDiscogsComponent implements OnInit, OnDestroy {
	id?: string;
	artist?: Jam.Artist;
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
		this.artist = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.id({ id: this.id })
			.then(artist => {
				this.artist = artist;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
