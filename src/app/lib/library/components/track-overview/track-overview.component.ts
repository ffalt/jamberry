import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { type Jam, JamService } from '@jam';
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
	imports: [DatePipe, FilesizePipe, DurationPipe, LoadingComponent, LyricsComponent]
})
export class TrackOverviewComponent {
	readonly navig = inject(NavigService);
	readonly track = signal<Jam.Track | undefined>(undefined);
	readonly svg = signal<{ viewbox: string; path: string } | undefined>(undefined);
	private id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
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
				this.svg.set(extractSVGParts(data));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.track.set(undefined);
		this.svg.set(undefined);
		this.load();
	}

	display(track: Jam.Track): void {
		this.track.set(track);
		this.loadWaveForm();
	}
}
