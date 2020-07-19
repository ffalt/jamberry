import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'app-load-more-button',
	templateUrl: './load-more-button.component.html',
	styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent {
	@Input() skip: number = 0;
	@Input() take: number = 20;
	@Input() total: number | undefined;
	@Input() hasMore: boolean = false;
	@Input() loading: boolean = false;
	@Output() readonly requestLoad = new EventEmitter();

	more(): void {
		this.skip += this.take;
		this.requestLoad.emit({});
	}

}
