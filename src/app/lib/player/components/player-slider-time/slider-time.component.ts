import { Component, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { JamService } from '@jam';
import { extractSVGParts } from '@utils/svg-parts';
import { formatDuration } from '@utils/formatters';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { AppService } from '@core/services/app/app.service';
import { PlayerService } from '@core/services/player/player.service';
import { PlayerEvents } from '@core/services/player/player.interface';

@Component({
	selector: 'app-time-slider',
	templateUrl: './slider-time.component.html',
	styleUrls: ['./slider-time.component.scss'],
	imports: [MediadurationPipe],
	host: {
		'role': 'slider',
		'aria-label': 'Seek',
		'aria-valuemin': '0',
		'[class.compact]': 'compact()',
		'[attr.aria-valuemax]': 'player.totalTime ?? 0',
		'[attr.aria-valuenow]': 'player.currentTime ?? 0',
		'[attr.aria-valuetext]': 'valueText()',
		'[tabindex]': 'tabindex',
		'(keydown.arrowLeft)': 'rewind()',
		'(keydown.arrowRight)': 'forward()'
	}
})
export class SliderTimeComponent {
	readonly compact = input(false);
	readonly hoverPC = signal(0);
	readonly hoverTime = signal<number | undefined>(undefined);
	readonly player = inject(PlayerService);
	readonly jam = inject(JamService);
	readonly app = inject(AppService);
	readonly timePC = signal(0);
	readonly svg = signal<{ viewbox: string; path: string } | undefined>(undefined);
	tabindex = '0';
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		const onTime = (): void => {
			this.updateTimeIndicator();
		};
		const onTrack = (): void => {
			this.displayTrack();
			this.updateTimeIndicator();
		};
		this.player.on(PlayerEvents.TIME, onTime);
		this.player.on(PlayerEvents.TRACK, onTrack);
		this.lifeRef.onDestroy(() => {
			this.player.off(PlayerEvents.TIME, onTime);
			this.player.off(PlayerEvents.TRACK, onTrack);
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

	valueText(): string {
		return `${formatDuration(this.player.currentTime ?? 0)} of ${formatDuration(this.player.totalTime ?? 0)}`;
	}

	trackHover(event: MouseEvent): void {
		const total = this.player.totalTime;
		if (total === undefined || !this.compact()) {
			return;
		}
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		const percent = Math.min(100, Math.max(0, event.offsetX * 100 / width));
		this.hoverPC.set(percent);
		this.hoverTime.set(total * percent / 100);
	}

	clearHover(): void {
		this.hoverTime.set(undefined);
	}

	changePlaybackTime(event: MouseEvent): void {
		const total = this.player.totalTime;
		if (total === undefined) {
			return;
		}
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		const percent = event.offsetX / width;
		const time = total * percent;
		setTimeout(() => {
			this.player.seek(time);
		}, 0);
	}
}
