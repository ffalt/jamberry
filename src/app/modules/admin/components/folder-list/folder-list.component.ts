import {Component, OnChanges, input} from '@angular/core';
import {Jam} from '@jam';

export class FolderItem {
	selected?: boolean;

	constructor(public folder: Jam.Folder) {
	}
}

@Component({
	selector: 'app-admin-folder-list',
	templateUrl: './folder-list.component.html',
	styleUrls: ['./folder-list.component.scss'],
	standalone: false
})
export class FolderListComponent implements OnChanges {
	readonly folders = input<Array<Jam.Folder>>([]);
	folderItems: Array<FolderItem> = [];

	ngOnChanges(): void {
		this.folderItems = (this.folders() || []).map(folder => (new FolderItem(folder)));
	}
}
