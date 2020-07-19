import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {JamService} from '@jam';
import {JamArtistObject} from '@library/model/objects';
import {LibraryService} from '@library/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artist-similar',
	templateUrl: './artist-similar.component.html',
	styleUrls: ['./artist-similar.component.scss']
})
export class ArtistSimilarComponent implements OnInit, OnDestroy {
	similar: Array<JamArtistObject>;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		private library: LibraryService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute) {
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
		this.similar = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.similar({id: this.id, artistIncState: true})
			.then(data => {
				this.similar = (data.items || []).map(o => new JamArtistObject(o, this.library));
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
