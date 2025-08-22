import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { MbAlbumComponent } from '../mb-album/mb-album.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-album-mb',
	templateUrl: './album-mb.component.html',
	styleUrls: ['./album-mb.component.scss'],
	imports: [MbAlbumComponent, BackgroundTextComponent, LoadingComponent]
})
export class AlbumMbComponent implements OnInit, OnDestroy {
	id?: string;
	album?: Jam.Album;
	mbReleaseID?: string;
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
				this.mbReleaseID = album.mbReleaseID;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
