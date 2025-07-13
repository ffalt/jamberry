import {Component, type OnChanges, input} from '@angular/core';
import type {JamLibraryObject} from '@library/model/objects';

interface ObjGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-view',
	templateUrl: './obj-groups-view.component.html',
	styleUrls: ['./obj-groups-view.component.scss'],
	standalone: false
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
				this.groups = (objs.length > 0) ? [{type: undefined, objs: objs}] : [];
				return;
			}
			const groups = [];
			for (const obj of objs) {
				const type = obj.groupType();
				let group: ObjGroupsView | undefined = groups.find(g => g.type === type);
				if (!group) {
					group = {type, objs: []};
					groups.push(group);
				}
				group.objs.push(obj);
			}
			this.groups = groups;
		}
	}
}
