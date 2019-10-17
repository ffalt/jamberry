import {Component, Input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import {JamObjectType} from '@jam';
import {IndexEntry, IndexGroup} from '@shared/services';

@Component({
	selector: 'app-index-group',
	templateUrl: 'index-group.component.html',
	styleUrls: ['index-group.component.scss']
})
export class IndexGroupComponent {
	@Input() indexType: JamObjectType;
	@Input() group: IndexGroup;
	visible: boolean = false;

	constructor(public app: AppService, private navig: NavigService) {
	}

	trackByEntryFn(index: number, item: IndexEntry): string {
		return item.id;
	}

	gotInView(): void {
		this.visible = true;
	}

	navigTo(entry: IndexEntry): void {
		switch (this.indexType) {
			case JamObjectType.artist:
				this.navig.toArtistID(entry.id, entry.name);
				break;
			case JamObjectType.folder:
				this.navig.toFolderID(entry.id, entry.name);
				break;
			case JamObjectType.album:
				this.navig.toAlbumID(entry.id, entry.name);
				break;
			default:
				break;
		}
	}
}
