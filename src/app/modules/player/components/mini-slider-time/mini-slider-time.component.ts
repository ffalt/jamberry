import {Component, ElementRef, OnInit} from '@angular/core';
import {AppService, PlayerEvents, PlayerService} from '@core/services';
import {JamService} from '@jam';

@Component({
	selector: 'app-mini-time-slider',
	templateUrl: './mini-slider-time.component.html',
	styleUrls: ['./mini-slider-time.component.scss']
})
export class MiniSliderTimeComponent implements OnInit {
	timePC: number = 0;

	constructor(private element: ElementRef, public player: PlayerService, public jam: JamService, private app: AppService) {
	}

	ngOnInit(): void {
		this.player.on(PlayerEvents.TIME, (time: number) => {
			this.updateTimeIndicator();
		});
		this.player.on(PlayerEvents.TRACK, () => {
			this.updateTimeIndicator();
		});
		this.updateTimeIndicator();
	}

	updateTimeIndicator(): void {
		this.timePC = this.calculatePositionPercentByTime();
	}

	calculatePositionPercentByTime(): number {
		return this.player.currentPercent();
	}

	changePlaybackTime(event: any): void {
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
