import { Component, input, type OnChanges } from '@angular/core';
import type { JamLibraryObject } from '../../model/objects';
import { ObjGroupsCardsComponent } from '../obj-groups-cards/obj-groups-cards.component';
import { ObjGroupsPlatesComponent } from '../obj-groups-plates/obj-groups-plates.component';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { ViewTypeToggleComponent } from '@core/components/view-type-toggle/view-type-toggle.component';

interface ObjGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-view',
	templateUrl: './obj-groups-view.component.html',
	styleUrls: ['./obj-groups-view.component.scss'],
	imports: [ObjGroupsPlatesComponent, ObjGroupsCardsComponent, BackgroundTextListComponent, ViewTypeToggleComponent]
})
export class ObjGroupsViewComponent implements OnChanges {
	readonly objs = input<Array<JamLibraryObject>>();
	readonly showParent = input<boolean>(false);
	readonly viewTypeList = input<boolean>(false);
	readonly grouping = input<boolean>(false);
	readonly typeName = input<string>();
	readonly headline = input<string>();
	groups?: Array<ObjGroupsView>;

	ngOnChanges(): void {
		this.groups = undefined;
		const objs = this.objs();
		if (objs) {
			if (!this.grouping()) {
				this.groups = (objs.length > 0) ? [{ type: undefined, objs: objs }] : [];
				return;
			}
			const groups = [];
			for (const obj of objs) {
				const type = obj.groupType();
				let group: ObjGroupsView | undefined = groups.find(g => g.type === type);
				if (!group) {
					group = { type, objs: [] };
					groups.push(group);
				}
				group.objs.push(obj);
			}
			this.groups = groups;
		}
	}
}
