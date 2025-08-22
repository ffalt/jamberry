import { Component, model, output } from '@angular/core';

@Component({
	selector: 'app-load-more-button',
	templateUrl: './load-more-button.component.html',
	styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent {
	readonly skip = model<number>(0);
	readonly take = model<number>(20);
	readonly total = model<number>();
	readonly hasMore = model<boolean>(false);
	readonly loading = model<boolean>(false);
	readonly requestLoad = output();

	more(): void {
		this.skip.set(this.skip() + this.take());
		this.requestLoad.emit();
	}
}
