import {Component, Input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import {Index, IndexEntry, IndexGroup} from '@shared/services';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	@Input() index?: Index;
	@Input() viewTypeList: boolean = false;

	constructor(public app: AppService, private navig: NavigService) {
	}

	trackByGroupFn(index: number, item: IndexGroup): string {
		return item.name;
	}

	trackByEntryFn(index: number, item: IndexEntry): string {
		return item.id;
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
