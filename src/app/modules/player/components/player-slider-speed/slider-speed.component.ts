import {Component, ElementRef, OnInit} from '@angular/core';
import {PlayerEvents, PlayerService} from '@core/services';

@Component({
	selector: 'app-speed-slider',
	templateUrl: 'slider-speed.component.html',
	styleUrls: ['slider-speed.component.scss']
})
export class SliderSpeedComponent implements OnInit {
	speedPC: number = 20;
	speedString: string = 'Speed: 1x';
	private speed: number = 1;
	private readonly min: number = 0;
	private readonly max: number = 3.5;

	constructor(private readonly player: PlayerService, private readonly element: ElementRef) {
	}

	ngOnInit(): void {
		this.displaySpeed(this.player.getSpeed());
		this.player.on(PlayerEvents.SPEED, (speed: number) => {
			this.displaySpeed(speed);
		});
	}

	changeSpeed(event: MouseEvent): void {
		const percent = this.calculateSpeedByPosition(event.offsetX);
		const speed = ((this.max - this.min) * percent / 100);
		this.player.speed(speed + 0.5);
	}

	private displaySpeed(speed: number): void {
		this.speed = speed;
		this.speedString = `Speed: ${speed.toFixed(2)}x`;
		this.speedPC = this.calculatePositionPercentBySpeed();
	}

	private calculatePositionPercentBySpeed(): number {
		return ((this.speed - 0.5) / (this.max - this.min) * 100);
	}

	private calculateSpeedByPosition(offsetX: number): number {
		const width = this.element.nativeElement.getBoundingClientRect().width || 1;
		return offsetX * 100 / width;
	}
}
