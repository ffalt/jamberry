import {Component, Input, output} from '@angular/core';

@Component({
	selector: 'app-load-more-button',
	templateUrl: './load-more-button.component.html',
	styleUrls: ['./load-more-button.component.scss'],
	standalone: false
})
export class LoadMoreButtonComponent {
	@Input() skip: number = 0;
	@Input() take: number = 20;
	@Input() total: number | undefined;
	@Input() hasMore: boolean = false;
	@Input() loading: boolean = false;
	readonly requestLoad = output();

	more(): void {
		this.skip += this.take;
		this.requestLoad.emit();
	}
}
