import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-album-overview',
	templateUrl: './album-overview.component.html',
	styleUrls: ['./album-overview.component.scss']
})
export class AlbumOverviewComponent implements OnInit, OnDestroy {
	album: Jam.Album;
	tracks: Array<Jam.Track> = [];
	isCompilation: boolean = false;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
	}

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
		this.tracks = album.tracks;
	}

	refresh(): void {
		this.album = undefined;
		this.tracks = [];
		if (this.id) {
			this.jam.album.id({id: this.id, trackIncState: true, trackIncTag: true, albumIncTracks: true, albumIncInfo: true})
				.then(album => {
					this.display(album);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

}
