import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { type ArtworkSearch, FolderArtworkSearchImageComponent } from '../folder-artwork-search/folder-artwork-search-image.component';

@Component({
	selector: 'app-dialog-folder-artwork-search',
	templateUrl: './dialog-folder-artwork-search.component.html',
	styleUrls: ['./dialog-folder-artwork-search.component.scss'],
	imports: [FolderArtworkSearchImageComponent]
})
export class DialogFolderArtworkSearchComponent implements DialogOverlay<ArtworkSearch> {
	data?: ArtworkSearch;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ArtworkSearch>>): void {
		this.data = options.data;
	}
}
