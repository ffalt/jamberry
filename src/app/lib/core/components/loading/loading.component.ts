import { Component, DestroyRef, inject, input, signal } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
	readonly time = input<number>(2000);
	readonly show = signal(false);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		const timer = setTimeout(() => {
			this.show.set(true);
		}, this.time());
		this.lifeRef.onDestroy(() => {
			clearTimeout(timer);
		});
	}
}
