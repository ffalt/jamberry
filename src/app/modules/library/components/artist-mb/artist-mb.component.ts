import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-artist-mb',
	templateUrl: './artist-mb.component.html',
	styleUrls: ['./artist-mb.component.scss'],
	standalone: false
})
export class ArtistMbComponent implements OnInit, OnDestroy {
	mbArtistID?: string;
	artist?: Jam.Artist;
	id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		if (this.route?.parent) {
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
				this.mbArtistID = artist?.mbArtistID;
			})
			.catch(error => this.notify.error(error));
	}
}
