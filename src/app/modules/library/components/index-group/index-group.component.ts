import {Component, inject, input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import {JamObjectType} from '@jam';
import {IndexEntry, IndexGroup} from '@shared/services';

@Component({
	selector: 'app-index-group',
	templateUrl: './index-group.component.html',
	styleUrls: ['./index-group.component.scss'],
	standalone: false
})
export class IndexGroupComponent {
	readonly indexType = input<JamObjectType>();
	readonly group = input<IndexGroup>();
	visible: boolean = false;
	readonly app = inject(AppService);
	private readonly navig = inject(NavigService);

	gotInView(): void {
		this.visible = true;
	}

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, {name: entry.name}]);
	}
}
