import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {extractSVGParts} from '@app/utils/svg-parts';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-track-overview',
	templateUrl: './track-overview.component.html',
	styleUrls: ['./track-overview.component.scss']
})
export class TrackOverviewComponent implements OnInit, OnDestroy {
	id?: string;
	track?: Jam.Track;
	svg?: { viewbox: string; path: string };
	protected unsubscribe = new Subject<void>();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute) {
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

	load(): void {
		if (!this.id) {
			return;
		}
		this.jam.track.id({
			id: this.id,
			trackIncState: true,
			trackIncTag: true,
			trackIncMedia: true
		})
			.then(track => {
				this.display(track);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadWaveForm(): void {
		if (!this.id) {
			return;
		}
		this.jam.waveform.svg({id: this.id, width: 2000})
			.then(data => {
				this.svg = extractSVGParts(data);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.track = undefined;
		this.svg = undefined;
		this.load();
	}

	display(track: Jam.Track): void {
		this.track = track;
		this.loadWaveForm();
	}

}
