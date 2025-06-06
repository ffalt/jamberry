import {Component, Input} from '@angular/core';
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
	@Input() indexType?: JamObjectType;
	@Input() group?: IndexGroup;
	visible: boolean = false;

	constructor(public app: AppService, private navig: NavigService) {
	}

	gotInView(): void {
		this.visible = true;
	}

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, {name: entry.name}]);
	}
}
