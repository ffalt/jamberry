import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {JamLibraryObject} from '@library/model/helper';

@Component({
	selector: 'app-obj-groups-view',
	templateUrl: './obj-groups-view.component.html',
	styleUrls: ['./obj-groups-view.component.scss']
})
export class ObjGroupsViewComponent implements OnChanges {
	@Input() objs: Array<JamLibraryObject>;
	@Input() showParent: boolean = false;
	@Input() viewTypeList: boolean = false;
	@Input() grouping: boolean = false;
	@Input() typeName: string;
	@Input() headline: string;
	groups: Array<{ type: string; objs: Array<JamLibraryObject>; }>;

	ngOnChanges(changes: SimpleChanges): void {
		this.groups = undefined;
		if (this.objs) {
			if (!this.grouping) {
				this.groups = (this.objs.length > 0) ? [{type: undefined, objs: this.objs}] : [];
				return;
			}
			const groups = [];
			for (const obj of this.objs) {
				const type = obj.groupType();
				let group = groups.find(g => g.type === type);
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
