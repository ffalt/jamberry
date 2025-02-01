import {Component} from '@angular/core';
import {TabComponent} from '@app/modules/tab-portal';
import {NavigService, PlayerService} from '@core/services';

@Component({
    selector: 'app-tab-info',
    templateUrl: './tab-info.component.html',
    styleUrls: ['./tab-info.component.scss'],
    standalone: false
})
export class TabInfoComponent implements TabComponent {

	constructor(public player: PlayerService, public navig: NavigService) {
	}

	onActivate(): void {
		//
	}
}
