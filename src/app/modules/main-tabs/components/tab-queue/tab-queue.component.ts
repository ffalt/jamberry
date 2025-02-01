import {Component} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';

@Component({
    selector: 'app-tab-queue',
    templateUrl: './tab-queue.component.html',
    styleUrls: ['./tab-queue.component.scss'],
    standalone: false
})
export class TabQueueComponent implements TabComponent {
	onActivate(): void {
		//
	}
}
