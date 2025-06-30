import {Component, OnDestroy, OnInit, inject} from '@angular/core';
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
	styleUrls: ['./artist-similar.component.scss'],
	standalone: false
})
export class ArtistSimilarComponent implements OnInit, OnDestroy {
	id?: string;
	similar?: Array<JamArtistObject>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

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
