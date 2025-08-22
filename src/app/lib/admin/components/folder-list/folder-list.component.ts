import { Component, input, type OnChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Jam } from '@jam';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';

export class FolderItem {
	selected?: boolean;

	constructor(public folder: Jam.Folder) {
	}
}

@Component({
	selector: 'app-admin-folder-list',
	templateUrl: './folder-list.component.html',
	styleUrls: ['./folder-list.component.scss'],
	imports: [RouterModule, BackgroundTextListComponent]
})
export class FolderListComponent implements OnChanges {
	readonly folders = input<Array<Jam.Folder>>([]);
	folderItems: Array<FolderItem> = [];

	ngOnChanges(): void {
		this.folderItems = this.folders().map(folder => (new FolderItem(folder)));
	}
}
