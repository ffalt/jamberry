/* eslint-disable @typescript-eslint/naming-convention */

import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {FrameDef, FrameDefs, getFrameSubIds} from '../../model/id3v2-frames.helper';
import {RawTagEditColumn} from '../../model/tag-editor.types';

export interface SelectColumns {
	columns: Array<RawTagEditColumn>;
	resultColumns: Array<{ frameDef: FrameDef; id: string; subid?: string }>;
}

export interface SelectColumn {
	id: string;
	name?: string;
	subid?: string;
	column?: RawTagEditColumn;
	frameDef: FrameDef;
	checked: boolean;
}

@Component({
	selector: 'app-dialog-choose-columns',
	templateUrl: './dialog-choose-columns.component.html',
	styleUrls: ['./dialog-choose-columns.component.scss']
})
export class DialogChooseColumnsComponent implements DialogOverlay<SelectColumns> {
	data?: SelectColumns;
	filteredColumns: Array<SelectColumn> = [];
	allColumns: Array<SelectColumn> = [];
	version = 4;
	urls: { [version: number]: string } = {
		2: 'http://id3.org/id3v2-00',
		3: 'http://id3.org/id3v2.3.0',
		4: 'http://id3.org/id3v2.4.0-frames'
	};

	trackByFn(index: number, value: SelectColumn): string {
		return value.id;
	}

	checkChange(): void {
		this.setResult();
	}

	setResult(): void {
		if (this.data) {
			this.data.resultColumns = this.filteredColumns.filter(c => c.checked);
		}
	}

	refresh(): void {
		this.filteredColumns = this.allColumns.filter(c => c.frameDef.versions.includes(this.version));
		this.setResult();
	}

	setVersion(version: number): void {
		this.version = version;
		this.refresh();
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<SelectColumns>>): void {
		this.data = options.data;
		this.allColumns = [];
		const columns = this.data?.columns || [];
		Object.keys(FrameDefs).forEach(key => {
			const subids = getFrameSubIds(key);
			if (subids.length === 0) {
				const column: RawTagEditColumn | undefined = columns.find(c => c.def.id === key);
				this.allColumns.push({
					id: key,
					frameDef: FrameDefs[key],
					column,
					checked: !!column
				});
			} else {
				for (const sub of subids) {
					const column: RawTagEditColumn | undefined = columns.find(c => c.def.id === key && c.def.subid === sub.subid);
					this.allColumns.push({
						id: key,
						subid: sub.subid,
						name: sub.name,
						frameDef: FrameDefs[key],
						column,
						checked: !!column
					});
				}
			}
		});
		this.allColumns = this.allColumns.sort((a, b) => (a.name || a.frameDef.title).localeCompare(b.name || b.frameDef.title));
		this.refresh();
	}
}
