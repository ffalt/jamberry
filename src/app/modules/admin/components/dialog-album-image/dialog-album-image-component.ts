import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {AlbumImageSearch} from '../album-image/album-image.component';

@Component({
	selector: 'app-dialog-album-image',
	templateUrl: './dialog-album-image.component.html',
	styleUrls: ['./dialog-album-image.component.scss']
})
export class DialogAlbumImageComponent implements DialogOverlay<AlbumImageSearch> {
	data: AlbumImageSearch;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AlbumImageSearch>>): void {
		this.data = options.data;
	}
}
