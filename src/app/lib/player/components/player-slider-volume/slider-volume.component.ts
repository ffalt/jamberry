import { Component, ElementRef, inject, signal } from '@angular/core';
import { PlayerService } from '@core/services/player/player.service';
import { PlayerEvents } from '@core/services/player/player.interface';

@Component({
	selector: 'app-volume-slider',
	templateUrl: './slider-volume.component.html',
	styleUrls: ['./slider-volume.component.scss'],
	host: {
		'[tabindex]': 'tabindex',
		'(keydown.arrowLeft)': 'volumeDown()',
		'(keydown.arrowRight)': 'volumeUp()'
	}
})
export class SliderVolumeComponent {
	readonly volumePC = signal(50);
	tabindex = '0';
	private readonly player = inject(PlayerService);
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private volume: number = 0;

	constructor() {
		this.displayVolume(this.player.getVolume());
		this.player.on(PlayerEvents.VOLUME, (volume: number) => {
			this.displayVolume(volume);
		});
	}

	volumeDown() {
		this.player.volumeDown();
	}

	volumeUp() {
		this.player.volumeUp();
	}

	changeVolume(event: MouseEvent): void {
		const percent = this.calculateVolumeByPosition(event.offsetX);
		this.player.volume(percent);
	}

	private displayVolume(volume: number): void {
		this.volume = volume;
		this.volumePC.set(this.calculatePositionPercentByVolume());
	}

	private calculatePositionPercentByVolume(): number {
		return this.volume;
	}

	private calculateVolumeByPosition(offsetX: number): number {
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		return offsetX * 100 / width;
	}
}
