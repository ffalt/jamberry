import { Component } from '@angular/core';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import type { Jam } from '@jam';

export interface McdiEdit {
	frames: Array<Jam.MediaTagRawFrameBin>;
}

export interface McdiTrack {
	label: string;
	offset: number;
	time: string;
}

export interface McdiInfo {
	firstTrack: number;
	lastTrack: number;
	tracks: Array<McdiTrack>;
	hex: string;
}

@Component({
	selector: 'app-dialog-tag-mcdi',
	templateUrl: './dialog-tag-mcdi.component.html',
	styleUrls: ['./dialog-tag-mcdi.component.scss']
})
export class DialogTagMcdiComponent implements DialogOverlay<McdiEdit> {
	edit?: McdiEdit;
	info?: McdiInfo;
	error?: string;

	dialogInit(_reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<McdiEdit>>): void {
		this.edit = options.data;
		const frame = this.edit?.frames[0];
		if (frame) {
			try {
				this.info = DialogTagMcdiComponent.parseToc(frame.value.bin);
			} catch {
				this.error = 'Could not parse CD TOC data.';
			}
		}
	}

	private static lbaToTime(lba: number): string {
		const totalSeconds = Math.floor(lba / 75);
		const mm = Math.floor(totalSeconds / 60);
		const ss = totalSeconds % 60;
		const ff = lba % 75;
		return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
	}

	private static parseToc(base64: string): McdiInfo {
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.codePointAt(i) ?? 0;
		}

		if (bytes.length < 4) {
			throw new Error('TOC too short');
		}

		const firstTrack = bytes[2];
		const lastTrack = bytes[3];
		const tracks: Array<McdiTrack> = [];

		for (let i = 4; i + 7 < bytes.length; i += 8) {
			const trackNum = bytes[i + 2];
			const lba = ((bytes[i + 4] << 24) | (bytes[i + 5] << 16) | (bytes[i + 6] << 8) | bytes[i + 7]) >>> 0;
			const label = trackNum === 0xAA ? 'Lead-out' : `Track ${trackNum}`;
			tracks.push({ label, offset: lba, time: DialogTagMcdiComponent.lbaToTime(lba) });
		}

		const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join(' ');
		return { firstTrack, lastTrack, tracks, hex };
	}
}
