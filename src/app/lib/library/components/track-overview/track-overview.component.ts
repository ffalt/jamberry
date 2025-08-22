import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type Jam, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { extractSVGParts } from '@utils/svg-parts';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { FilesizePipe } from '@core/pipes/filesize.pipe';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { LyricsComponent } from '@core/components/lyrics/lyrics.component';
import { NavigService } from '@core/services/navig/navig.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-track-overview',
	templateUrl: './track-overview.component.html',
	styleUrls: ['./track-overview.component.scss'],
	imports: [CommonModule, FilesizePipe, DurationPipe, LoadingComponent, LyricsComponent]
})
export class TrackOverviewComponent implements OnInit, OnDestroy {
	readonly navig = inject(NavigService);
	id?: string;
	track?: Jam.Track;
	svg?: { viewbox: string; path: string };
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
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
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	loadWaveForm(): void {
		if (!this.id) {
			return;
		}
		this.jam.waveform.svg({ id: this.id, width: 2000 })
			.then(data => {
				this.svg = extractSVGParts(data);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
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
