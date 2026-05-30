import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { DiscogsAlbumComponent } from '../discogs-album/discogs-album.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-album-discogs',
	templateUrl: './album-discogs.component.html',
	styleUrls: ['./album-discogs.component.scss'],
	imports: [DiscogsAlbumComponent, LoadingComponent]
})
export class AlbumDiscogsComponent implements OnInit, OnDestroy {
	id?: string;
	album?: Jam.Album;
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
		this.album = undefined;
		if (!this.id) {
			return;
		}
		this.jam.album.id({ id: this.id })
			.then(album => {
				this.album = album;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
