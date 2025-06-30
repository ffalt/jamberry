import {Component, input} from '@angular/core';
import {IndexEntry} from '@shared/services';

@Component({
	selector: 'app-index-entry-card',
	templateUrl: './index-entry-card.component.html',
	styleUrls: ['./index-entry-card.component.scss'],
	standalone: false
})
export class IndexEntryCardComponent {
	readonly entry = input<IndexEntry>();
	visible: boolean = false;

	gotInView(): void {
		this.visible = true;
	}
}
