import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Jam} from '@jam';
import {JamDataSource} from '../../model/data-source';

@Component({
	selector: 'app-admin-folder-list',
	templateUrl: 'folder-list.component.html',
	styleUrls: ['folder-list.component.scss']
})
export class FolderListComponent implements OnChanges {
	@Input() folders: Array<Jam.Folder> = [];
	dataSource: JamDataSource<Jam.Folder>;
	displayedColumns: Array<string> = ['name', 'artist', 'album', 'year', 'type'];

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

	ngOnChanges(changes: SimpleChanges): void {
		if (this.folders) {
			this.dataSource = new JamDataSource<Jam.Folder>(this.folders, this.getSortValue.bind(this));
		}
	}

}
