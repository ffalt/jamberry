import { Component, viewChild } from '@angular/core';
import type { Jam } from '@jam';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { FolderTreeComponent } from '../folder-tree/folder-tree.component';

export interface SelectFolder {
	selectID?: string;
	disableIDs?: Array<string>;
	folder?: Jam.Folder;
}

@Component({
	selector: 'app-dialog-choose-folder',
	templateUrl: './dialog-choose-folder.component.html',
	styleUrls: ['./dialog-choose-folder.component.scss'],
	imports: [FolderTreeComponent]
})
export class DialogChooseFolderComponent implements DialogOverlay<SelectFolder> {
	data?: SelectFolder;
	private readonly tree = viewChild(FolderTreeComponent);

	selectionChange(folder: Jam.Folder): void {
		if (this.data) {
			this.data.folder = folder;
		}
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<SelectFolder>>): void {
		this.data = options.data;
		const tree = this.tree();
		if (tree) {
			tree.refresh();
			if (this.data?.selectID) {
				tree.selectFolderByID(this.data.selectID);
			}
		}
	}
}
