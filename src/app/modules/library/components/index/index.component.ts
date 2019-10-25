import {Component, Input} from '@angular/core';
import {AppService, NavigService} from '@core/services';
import {JamObjectType} from '@jam';
import {Index, IndexEntry, IndexGroup} from '@shared/services';

export function scrollToIndexGroup(index: number): void {
	const elements = document.getElementById('index-' + index.toString());
	elements.scrollIntoView();
}

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	@Input() index: Index;
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
		switch (this.index.type) {
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

	navigToExtra(entry: IndexEntry): void {
		switch (entry.extraMode) {
			case JamObjectType.artist:
				this.navig.toArtistID(entry.extraID, entry.extra);
				break;
			case JamObjectType.folder:
				this.navig.toFolderID(entry.extraID, entry.extra);
				break;
			case JamObjectType.album:
				this.navig.toAlbumID(entry.extraID, entry.extra);
				break;
			default:
				break;
		}
	}

}
