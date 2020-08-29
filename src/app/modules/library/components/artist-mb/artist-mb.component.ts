import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-mb',
	templateUrl: './artist-mb.component.html',
	styleUrls: ['./artist-mb.component.scss']
})
export class ArtistMbComponent implements OnInit, OnDestroy {
	mbArtistID?: string;
	artist?: Jam.Artist;
	id?: string;
	protected unsubscribe = new Subject();

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
		this.artist = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.id({id: this.id})
			.then(artist => {
				this.artist = artist;
				this.mbArtistID = artist && artist.mbArtistID ? artist.mbArtistID : undefined;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
