import {Component, Input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import {Index, IndexEntry} from '@shared/services';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: false
})
export class IndexComponent {
	@Input() index?: Index;
	@Input() viewTypeList: boolean = false;

	constructor(public app: AppService, private navig: NavigService) {
	}

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, {name: entry.name}]);
	}

	navigToExtra(entry: IndexEntry): void {
		if (entry.extraLink) {
			this.navig.navigate([entry.extraLink, {name: entry.name}]);
		}
	}
}
