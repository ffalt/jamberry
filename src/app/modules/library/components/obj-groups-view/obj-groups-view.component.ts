import {Component, Input, OnChanges} from '@angular/core';
import {JamLibraryObject} from '@library/model/objects';

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
	@Input() objs?: Array<JamLibraryObject>;
	@Input() showParent: boolean = false;
	@Input() viewTypeList: boolean = false;
	@Input() grouping: boolean = false;
	@Input() typeName?: string;
	@Input() headline?: string;
	groups?: Array<ObjGroupsView>;

	ngOnChanges(): void {
		this.groups = undefined;
		if (this.objs) {
			if (!this.grouping) {
				this.groups = (this.objs.length > 0) ? [{type: undefined, objs: this.objs}] : [];
				return;
			}
			const groups = [];
			for (const obj of this.objs) {
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
