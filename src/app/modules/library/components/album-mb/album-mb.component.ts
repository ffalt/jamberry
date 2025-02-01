import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-album-mb',
    templateUrl: './album-mb.component.html',
    styleUrls: ['./album-mb.component.scss'],
    standalone: false
})
export class AlbumMbComponent implements OnInit, OnDestroy {
	id?: string;
	album?: Jam.Album;
	mbReleaseID?: string;
	protected unsubscribe = new Subject<void>();

	constructor(protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.parent.params
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

	refresh(): void {
		this.album = undefined;
		if (!this.id) {
			return;
		}
		this.jam.album.id({id: this.id})
			.then(album => {
				this.album = album;
				this.mbReleaseID = album ? album.mbReleaseID : undefined;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
