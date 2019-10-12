import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {ArtistImageSearch} from '../artist-image/artist-image.component';

@Component({
	selector: 'app-dialog-artist-image',
	templateUrl: 'dialog-artist-image.component.html',
	styleUrls: ['dialog-artist-image.component.scss']
})
export class DialogArtistImageComponent implements DialogOverlay<ArtistImageSearch> {
	data: ArtistImageSearch;

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<ArtistImageSearch>>): void {
		this.data = options.data;
	}
}
