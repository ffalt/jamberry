import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { AlbumType, type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { TrackListComponent } from '../track-list/track-list.component';
import { InfoNoteComponent } from '@core/components/info-note/info-note.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-album-overview',
	templateUrl: './album-overview.component.html',
	styleUrls: ['./album-overview.component.scss'],
	imports: [TrackListComponent, InfoNoteComponent, LoadingComponent]
})
export class AlbumOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	album?: Jam.Album;
	tracks: Array<Jam.Track> = [];
	isCompilation: boolean = false;
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	display(album: Jam.Album): void {
		this.album = album;
		this.isCompilation = this.album.albumType === AlbumType.compilation;
		this.tracks = album.tracks ?? [];
	}

	refresh(): void {
		this.album = undefined;
		this.tracks = [];
		if (this.id) {
			this.jam.album.id({
				id: this.id,
				trackIncState: true,
				trackIncTag: true,
				albumIncGenres: true,
				albumIncTracks: true,
				albumIncInfo: true
			})
				.then(album => {
					this.display(album);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}
}
