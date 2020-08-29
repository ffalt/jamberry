import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {Jam} from '@jam';

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
	@Input() info?: Jam.ExtendedInfo;
	longInfo = false;
	notes: Array<string> = [];

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		this.refresh();
	}

	private refresh(): void {
		this.notes = this.info ? splitLines(this.info.description) : [];
	}
}
