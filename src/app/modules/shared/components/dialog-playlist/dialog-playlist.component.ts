import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Jam} from '@jam';
import {PlaylistEdit} from '@shared/services';

@Component({
	selector: 'app-dialog-new-playlist',
	templateUrl: './dialog-playlist.component.html',
	styleUrls: ['./dialog-playlist.component.scss'],
	standalone: false
})
export class DialogPlaylistComponent implements DialogOverlay<PlaylistEdit> {
	showTrackPreview = false;
	playlistEdit?: PlaylistEdit;

	remove(track: Jam.MediaBase): void {
		if (this.playlistEdit) {
			this.playlistEdit.entries = this.playlistEdit.entries.filter(t => t.id !== track.id);
		}
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PlaylistEdit>>): void {
		this.playlistEdit = options.data;
	}
}
