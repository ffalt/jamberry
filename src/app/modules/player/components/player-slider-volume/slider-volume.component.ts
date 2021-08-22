import {Component, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';
import {PlayerEvents, PlayerService} from '@core/services';

@Component({
	selector: 'app-volume-slider',
	templateUrl: './slider-volume.component.html',
	styleUrls: ['./slider-volume.component.scss']
})
export class SliderVolumeComponent implements OnInit {
	volumePC: number = 50;
	@HostBinding() tabindex = '0';
	private volume: number = 0;

	constructor(private player: PlayerService, private element: ElementRef) {
	}

	@HostListener('keydown.arrowLeft', ['$event'])
	volumeDown(event: KeyboardEvent) {
		this.player.volumeDown();
	}

	@HostListener('keydown.arrowRight', ['$event'])
	volumeUp(event: KeyboardEvent) {
		this.player.volumeUp();
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
		this.volumePC = this.calculatePositionPercentByVolume();
	}

	private calculatePositionPercentByVolume(): number {
		return this.volume;
	}

	private calculateVolumeByPosition(offsetX: number): number {
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		return offsetX * 100 / width;
	}
}
