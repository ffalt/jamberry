import { Component, ElementRef, inject, signal } from '@angular/core';
import { JamService } from '@jam';
import { PlayerService } from '@core/services/player/player.service';
import { PlayerEvents } from '@core/services/player/player.interface';

@Component({
	selector: 'app-mini-time-slider',
	templateUrl: './mini-slider-time.component.html',
	styleUrls: ['./mini-slider-time.component.scss']
})
export class MiniSliderTimeComponent {
	readonly player = inject(PlayerService);
	readonly jam = inject(JamService);
	readonly timePC = signal(0);
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

	constructor() {
		this.player.on(PlayerEvents.TIME, () => {
			this.updateTimeIndicator();
		});
		this.player.on(PlayerEvents.TRACK, () => {
			this.updateTimeIndicator();
		});
		this.updateTimeIndicator();
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
