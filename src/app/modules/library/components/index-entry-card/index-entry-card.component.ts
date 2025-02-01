import {Component, Input} from '@angular/core';
import {IndexEntry} from '@shared/services';

@Component({
    selector: 'app-index-entry-card',
    templateUrl: './index-entry-card.component.html',
    styleUrls: ['./index-entry-card.component.scss'],
    standalone: false
})
export class IndexEntryCardComponent {
	@Input() entry?: IndexEntry;
	visible: boolean = false;

	gotInView(): void {
		this.visible = true;
	}

}
