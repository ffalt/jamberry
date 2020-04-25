import {Component, Input, OnChanges} from '@angular/core';
import {Jam} from '@jam';

export class FolderItem {
	folder: Jam.Folder;
	selected?: boolean;
}

@Component({
	selector: 'app-admin-folder-list',
	templateUrl: './folder-list.component.html',
	styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnChanges {
	@Input() folders: Array<Jam.Folder> = [];
	folderItems: Array<FolderItem> = [];

	getSortValue(column: string, folder: Jam.Folder): string | number | undefined {
		switch (column) {
			case 'name':
				return folder.name;
			case 'artist':
				return folder.tag.artist;
			case 'album':
				return folder.tag.album;
			case 'type':
				return folder.type;
			default:
				return;
		}
	}

	ngOnChanges(/*changes: SimpleChanges*/): void {
		this.folderItems = (this.folders || []).map(folder => ({folder}));
	}

}
