import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { RawTagEditFrame } from '../../model/tag-editor.types';

export interface SyncedLyricsValue {
	id: string;
	language: string;
	timestampFormat: number;
	contentType: number;
	events: Array<{ timestamp: number; text: string }>;
}

export interface SyncedLyricsEdit {
	frames: Array<RawTagEditFrame<SyncedLyricsValue>>;
	description?: string;
	result?: Array<RawTagEditFrame<SyncedLyricsValue>>;
	validate?: () => boolean;
}

@Component({
	selector: 'app-dialog-tag-synced-lyrics',
	templateUrl: './dialog-tag-synced-lyrics.component.html',
	styleUrls: ['./dialog-tag-synced-lyrics.component.scss'],
	imports: [FormsModule]
})
export class DialogTagSyncedLyricsComponent implements DialogOverlay<SyncedLyricsEdit> {
	edit?: SyncedLyricsEdit;
	readonly invalid = signal(false);

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<SyncedLyricsEdit>>): void {
		this.edit = options.data;
		if (!this.edit) {
			return;
		}
		this.edit.result = this.edit.frames.map(frame => ({
			...frame,
			value: { ...frame.value, events: frame.value.events.map(event => ({ ...event })) }
		}));
		if (this.edit.result.length === 0) {
			this.addFrame();
		}
		this.edit.validate = () => this.validate();
	}

	addFrame(): void {
		if (this.edit?.result?.length === 0) {
			this.edit.result.push({
				id: 'SYLT',
				value: { id: this.edit.description ?? 'lyrics', language: 'und', timestampFormat: 2, contentType: 1, events: [] }
			});
		}
	}

	addLine(frame: RawTagEditFrame<SyncedLyricsValue>): void {
		frame.value.events.push({ timestamp: 0, text: '' });
	}

	removeLine(frame: RawTagEditFrame<SyncedLyricsValue>, index: number): void {
		frame.value.events.splice(index, 1);
	}

	removeFrame(index: number): void {
		this.edit?.result?.splice(index, 1);
	}

	private validate(): boolean {
		const valid = (this.edit?.result ?? []).every(frame => frame.value.events.every(event =>
			Number.isSafeInteger(event.timestamp) && event.timestamp >= 0 && event.timestamp <= 4_294_967_295));
		this.invalid.set(!valid);
		return valid;
	}
}
