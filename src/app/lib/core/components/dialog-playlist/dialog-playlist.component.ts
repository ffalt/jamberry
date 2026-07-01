import { Component, signal } from '@angular/core';
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
	imports: [DurationPipe, IconExpandCollapseComponent, FormsModule, IconRemoveComponent]
})
export class DialogPlaylistComponent implements DialogOverlay<PlaylistEdit> {
	showTrackPreview = false;
	readonly playlistEdit = signal<PlaylistEdit | undefined>(undefined);

	remove(track: Jam.MediaBase): void {
		const edit = this.playlistEdit();
		if (!edit) {
			return;
		}
		edit.entries = edit.entries.filter(t => t.id !== track.id);
		this.playlistEdit.update(e => e ? { ...e } : e);
	}

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<PlaylistEdit>>): void {
		this.playlistEdit.set(options.data);
	}
}
