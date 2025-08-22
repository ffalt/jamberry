import { Component, ElementRef, inject, type OnInit } from '@angular/core';
import { PlayerService } from '@core/services/player/player.service';
import { PlayerEvents } from '@core/services/player/player.interface';

@Component({
	selector: 'app-speed-slider',
	templateUrl: './slider-speed.component.html',
	styleUrls: ['./slider-speed.component.scss']
})
export class SliderSpeedComponent implements OnInit {
	speedPC: number = 20;
	speedString: string = 'Speed: 1x';
	private readonly min: number = 0;
	private readonly max: number = 3.5;
	private readonly player = inject(PlayerService);
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private speed: number = 1;

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
