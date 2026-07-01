import { Component, ElementRef, inject, signal } from '@angular/core';
import { JamService } from '@jam';
import { extractSVGParts } from '@utils/svg-parts';
import { AppService } from '@core/services/app/app.service';
import { PlayerService } from '@core/services/player/player.service';
import { PlayerEvents } from '@core/services/player/player.interface';

@Component({
	selector: 'app-time-slider',
	templateUrl: './slider-time.component.html',
	styleUrls: ['./slider-time.component.scss'],
	host: {
		'[tabindex]': 'tabindex',
		'(keydown.arrowLeft)': 'rewind()',
		'(keydown.arrowRight)': 'forward()'
	}
})
export class SliderTimeComponent {
	readonly player = inject(PlayerService);
	readonly jam = inject(JamService);
	readonly app = inject(AppService);
	readonly timePC = signal(0);
	readonly svg = signal<{ viewbox: string; path: string } | undefined>(undefined);
	tabindex = '0';
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

	constructor() {
		this.player.on(PlayerEvents.TIME, () => {
			this.updateTimeIndicator();
		});
		this.player.on(PlayerEvents.TRACK, () => {
			this.displayTrack();
			this.updateTimeIndicator();
		});
		this.displayTrack();
		this.updateTimeIndicator();
	}

	displayTrack(): void {
		this.updateTimeIndicator();
		this.displayWaveForm();
	}

	rewind() {
		this.player.rewind(2);
	}

	forward() {
		this.player.forward(2);
	}

	displayWaveForm(): void {
		this.svg.set(undefined);
		if (this.app.settings.showWaveform && this.player.currentMedia) {
			this.jam.waveform.svg({ id: this.player.currentMedia.id, width: this.app.smallscreen ? 1000 : 4000 })
				.then(data => {
					this.svg.set(extractSVGParts(data));
				})
				.catch((error: unknown) => {
					console.error(error);
				});
		}
	}

	updateTimeIndicator(): void {
		this.timePC.set(this.calculatePositionPercentByTime());
	}

	calculatePositionPercentByTime(): number {
		return this.player.currentPercent();
	}

	changePlaybackTime(event: MouseEvent): void {
		const total = this.player.totalTime;
		if (total !== undefined) {
			const width = this.element.nativeElement.getBoundingClientRect().width || 1;
			const percent = event.offsetX / width;
			const time = total * percent;
			setTimeout(() => {
				this.player.seek(time);
			}, 0);
		}
	}
}
