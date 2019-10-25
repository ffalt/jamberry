import {Component, ElementRef, ViewChild} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Jam} from '@jam';
import {PlaylistEdit} from '@shared/services';

@Component({
	selector: 'app-dialog-new-playlist',
	templateUrl: './dialog-playlist.component.html',
	styleUrls: ['./dialog-playlist.component.scss']
})
export class DialogPlaylistComponent implements DialogOverlay<PlaylistEdit> {
	showTrackPreview = false;
	playlistEdit: PlaylistEdit;
	@ViewChild('playlistNameInput', {static: true}) playlistNameInput: ElementRef;

	remove(track: Jam.Track): void {
		this.playlistEdit.tracks = this.playlistEdit.tracks.filter(t => t.id !== track.id);
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PlaylistEdit>>): void {
		this.playlistEdit = options.data;
	}

}
