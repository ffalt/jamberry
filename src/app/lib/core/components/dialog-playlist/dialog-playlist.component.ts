import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../../pipes/duration.pipe';
import type { PlaylistEdit } from '../../services/playlist-dialogs/playlist-dialogs.service';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';
import { IconExpandCollapseComponent } from '@core/components/icons/icon-expand-collapse.component';

@Component({
	selector: 'app-dialog-new-playlist',
	templateUrl: './dialog-playlist.component.html',
	styleUrls: ['./dialog-playlist.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [DurationPipe, IconExpandCollapseComponent, FormsModule, IconRemoveComponent]
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
