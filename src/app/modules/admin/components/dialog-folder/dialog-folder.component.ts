import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {FolderEdit} from '../../admin.interface';

@Component({
	selector: 'app-dialog-folder',
	templateUrl: './dialog-folder.component.html',
	styleUrls: ['./dialog-folder.component.scss']
})
export class DialogFolderComponent implements DialogOverlay<FolderEdit> {
	edit: FolderEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<FolderEdit>>): void {
		this.edit = options.data;
	}
}
