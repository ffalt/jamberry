import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { MbArtistComponent } from '../mb-artist/mb-artist.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-artist-mb',
	templateUrl: './artist-mb.component.html',
	styleUrls: ['./artist-mb.component.scss'],
	imports: [MbArtistComponent, BackgroundTextComponent, LoadingComponent]
})
export class ArtistMbComponent implements OnInit, OnDestroy {
	mbArtistID?: string;
	artist?: Jam.Artist;
	id?: string;
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
				this.mbArtistID = artist.mbArtistID;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
