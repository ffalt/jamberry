import {Component} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';

@Component({
    selector: 'app-tab-main',
    templateUrl: './tab-main.component.html',
    styleUrls: ['./tab-main.component.scss'],
    standalone: false
})
export class TabMainComponent implements TabComponent {
	onActivate(): void {
		//
	}
}
