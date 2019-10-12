import {Component, ElementRef, OnInit} from '@angular/core';
import {extractSVGParts} from '@app/utils/svg-parts';
import {AppService, PlayerEvents, PlayerService} from '@core/services';
import {JamService} from '@jam';

@Component({
	selector: 'app-time-slider',
	templateUrl: 'slider-time.component.html',
	styleUrls: ['slider-time.component.scss']
})
export class SliderTimeComponent implements OnInit {
	timePC: string = '0%';
	svg: { viewbox: string; path: string };

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
		if (this.app.settings.showWaveform && this.player.currentTrack) {
			this.jam.media.waveform_svg_binary(this.player.currentTrack.id, this.app.smallscreen ? 1000 : 4000)
				.then(data => {
					this.svg = extractSVGParts(data);
				})
				.catch(e => {
					console.error(e);
				});
		}
	}

	updateTimeIndicator(): void {
		this.timePC = this.calculatePositionByTime();
	}

	calculatePositionByTime(): string {
		const percent = this.player.currentTime * 100 / this.player.totalTime;
		return `${percent}%`;
	}

	changePlaybackTime(event: any): void {
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		const percent = event.offsetX / width;
		const time = this.player.totalTime * percent;
		setTimeout(() => {
			this.player.seek(time);
		}, 0);
	}

}
