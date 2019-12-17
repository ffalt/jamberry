import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {JamObjectType} from '@jam';
import {JamLibraryObject} from '@library/model/helper';

@Component({
	selector: 'app-obj-plate',
	templateUrl: './obj-plate.component.html',
	styleUrls: ['./obj-plate.component.scss']
})
export class ObjPlateComponent implements OnChanges {
	@Input() obj: JamLibraryObject;
	@Input() showParent: boolean = false;
	expanded: boolean = false;
	hasTracks: boolean = false;
	hasAlbums: boolean = false;
	hasEpisodes: boolean = false;

	ngOnChanges(changes: SimpleChanges): void {
		this.expanded = false;
		this.hasTracks = this.obj && this.obj.childrenTypes.includes(JamObjectType.track);
		this.hasAlbums = this.obj && this.obj.childrenTypes.includes(JamObjectType.album);
		this.hasEpisodes = this.obj && this.obj.childrenTypes.includes(JamObjectType.episode);
	}

	toggleExpansion(): void {
		if (this.obj.childrenTypes.length > 0) {
			this.expanded = !this.expanded;
			if (this.expanded) {
				this.obj.loadChildren();
			}
		}
	}
}
