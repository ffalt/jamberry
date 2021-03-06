import {Component, ElementRef, OnInit} from '@angular/core';
import {extractSVGParts} from '@app/utils/svg-parts';
import {AppService, PlayerEvents, PlayerService} from '@core/services';
import {JamService} from '@jam';

@Component({
	selector: 'app-time-slider',
	templateUrl: './slider-time.component.html',
	styleUrls: ['./slider-time.component.scss']
})
export class SliderTimeComponent implements OnInit {
	timePC: number = 0;
	svg?: { viewbox: string; path: string };

	constructor(private element: ElementRef, public player: PlayerService, public jam: JamService, private app: AppService) {
	}

	ngOnInit(): void {
		this.player.on(PlayerEvents.TIME, (time: number) => {
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

	displayWaveForm(): void {
		this.svg = undefined;
		if (this.app.settings.showWaveform && this.player.currentMedia) {
			this.jam.waveform.svg({id: this.player.currentMedia.id, width: this.app.smallscreen ? 1000 : 4000})
				.then(data => {
					this.svg = extractSVGParts(data);
				})
				.catch(e => {
					console.error(e);
				});
		}
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
