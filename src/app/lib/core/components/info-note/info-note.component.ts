import { Component, input, type OnChanges } from '@angular/core';
import type { Jam } from '@jam';

function splitLines(text: string): Array<string> {
	if (!text) {
		return [];
	}
	return text.split('\n').filter(s => s.trim().length > 0);
}

@Component({
	selector: 'app-info-note',
	templateUrl: './info-note.component.html',
	styleUrls: ['./info-note.component.scss']
})
export class InfoNoteComponent implements OnChanges {
	readonly info = input<Jam.ExtendedInfo>();
	longInfo = false;
	notes: Array<string> = [];

	ngOnChanges(): void {
		this.refresh();
	}

	private refresh(): void {
		const info = this.info();
		this.notes = info ? splitLines(info.description) : [];
	}
}
