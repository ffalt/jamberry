import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-similar',
	templateUrl: './artist-similar.component.html',
	styleUrls: ['./artist-similar.component.scss']
})
export class ArtistSimilarComponent implements OnInit, OnDestroy {
	artist: Jam.Artist;
	id: string;
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
		this.jam.artist.id({id: this.id, artistSimilar: true})
			.then(artist => {
				this.artist = artist;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
