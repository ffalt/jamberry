import {Component, ElementRef, OnInit} from '@angular/core';
import {PlayerEvents, PlayerService} from '@core/services';

@Component({
	selector: 'app-volume-slider',
	templateUrl: 'slider-volume.component.html',
	styleUrls: ['slider-volume.component.scss']
})
export class SliderVolumeComponent implements OnInit {
	volumePC: string = '50%';
	private volume: number = 0;

	constructor(private player: PlayerService, private element: ElementRef) {
	}

	ngOnInit(): void {
		this.displayVolume(this.player.getVolume());
		this.player.on(PlayerEvents.VOLUME, (volume: number) => {
			this.displayVolume(volume);
		});
	}

	changeVolume(event: MouseEvent): void {
		const percent = this.calculateVolumeByPosition(event.offsetX);
		this.player.volume(percent);
	}

	private displayVolume(volume: number): void {
		this.volume = volume;
		this.volumePC = this.calculatePositionByVolume();
	}

	private calculatePositionByVolume(): string {
		return this.volume.toString() + '%';
	}

	private calculateVolumeByPosition(offsetX: number): number {
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		return offsetX * 100 / width;
	}
}
