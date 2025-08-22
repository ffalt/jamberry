import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { FolderEdit } from '../../admin.interface';

@Component({
	selector: 'app-dialog-folder',
	templateUrl: './dialog-folder.component.html',
	styleUrls: ['./dialog-folder.component.scss'],
	imports: [FormsModule]
})
export class DialogFolderComponent implements DialogOverlay<FolderEdit> {
	edit?: FolderEdit;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<FolderEdit>>): void {
		this.edit = options.data;
	}
}
