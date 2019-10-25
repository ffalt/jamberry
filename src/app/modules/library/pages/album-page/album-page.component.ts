import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {AlbumType, Jam, JamService} from '@jam';
import {ContextMenuAlbumComponent} from '@library/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-album',
	templateUrl: 'album-page.component.html',
	styleUrls: ['album-page.component.scss']
})
export class AlbumPageComponent implements OnInit, OnDestroy {
	album: Jam.Album;
	tracks: Array<Jam.Track> = [];
	isCompilation: boolean = false;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute,
		private contextMenuService: ContextMenuService
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

	onContextMenu($event: MouseEvent, item: Jam.Album): void {
		this.contextMenuService.open(ContextMenuAlbumComponent, item, $event);
	}

	refresh(): void {
		this.album = undefined;
		this.tracks = [];
		if (this.id) {
			this.jam.album.id({id: this.id, albumState: true, trackState: true, trackTag: true, albumTracks: true, albumInfo: true})
				.then(album => {
					this.album = album;
					this.isCompilation = this.album.albumType === AlbumType.compilation;
					this.tracks = album.tracks;
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

}
