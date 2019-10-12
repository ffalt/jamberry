import {Component, Input} from '@angular/core';
import {IndexEntry} from '@library/services';

@Component({
	selector: 'app-index-entry',
	templateUrl: 'index-entry.component.html',
	styleUrls: ['index-entry.component.scss']
})
export class IndexEntryComponent {
	@Input() entry: IndexEntry;
	visible: boolean = false;

	gotInView(): void {
		this.visible = true;
	}

}
