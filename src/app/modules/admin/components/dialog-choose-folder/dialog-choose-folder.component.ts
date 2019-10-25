import {Component, ViewChild} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Jam} from '@jam';
import {FolderTreeComponent} from '../folder-tree/folder-tree.component';

export interface SelectFolder {
	selectID?: string;
	disableIDs?: Array<string>;
	folder?: Jam.Folder;
}

@Component({
	selector: 'app-dialog-choose-folder',
	templateUrl: './dialog-choose-folder.component.html',
	styleUrls: ['./dialog-choose-folder.component.scss']
})
export class DialogChooseFolderComponent implements DialogOverlay<SelectFolder> {
	data: SelectFolder;
	@ViewChild(FolderTreeComponent, {static: true}) tree: FolderTreeComponent;

	selectionChange(folder: Jam.Folder): void {
		this.data.folder = folder;
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<SelectFolder>>): void {
		this.data = options.data;
		this.tree.refresh();
		this.tree.selectFolderByID(options.data.selectID);
	}
}
