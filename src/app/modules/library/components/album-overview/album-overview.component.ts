import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {AlbumType, Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-album-overview',
	templateUrl: './album-overview.component.html',
	styleUrls: ['./album-overview.component.scss'],
	standalone: false
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
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	display(album: Jam.Album): void {
		this.album = album;
		this.isCompilation = this.album.albumType === AlbumType.compilation;
		this.tracks = album.tracks || [];
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
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

}
