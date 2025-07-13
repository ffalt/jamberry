import {Component, inject, input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import type {Index, IndexEntry} from '@shared/services';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	standalone: false
})
export class IndexComponent {
	readonly index = input<Index>();
	readonly viewTypeList = input<boolean>(false);
	readonly app = inject(AppService);
	private readonly navig = inject(NavigService);

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, {name: entry.name}]);
	}

	navigToExtra(entry: IndexEntry): void {
		if (entry.extraLink) {
			this.navig.navigate([entry.extraLink, {name: entry.name}]);
		}
	}
}
