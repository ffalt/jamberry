import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {isEnterKey} from '@app/utils/keys';
import {RawTagEditCell, RawTagEditFrame} from '../../model/tag-editor.types';

export interface BinFrame {
	name: string;
	frame: RawTagEditFrame;
}

@Component({
	selector: 'app-cell-editor-bin',
	templateUrl: 'cell-editor-bin.component.html',
	styleUrls: ['cell-editor-bin.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorBinComponent)}]
})
export class CellEditorBinComponent extends CellEditor implements OnChanges {
	bins: Array<BinFrame> = [];
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();

	constructor(private element: ElementRef) {
		super();
	}

	navigTo(): void {
		if (this.element) {
			this.element.nativeElement.focus();
		}
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (!isEnterKey(event)) {
			this.onNavigKeyDown(event);
		}
	}

	remove(bin: BinFrame): void {
		this.cell.frames.splice(this.cell.frames.indexOf(bin.frame), 1);
		this.cell.changed = true;
		this.cell.parent.changed = true;
		this.update();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.update();
	}

	private update(): void {
		this.bins = [];
		if (this.cell) {
			this.bins = (this.cell.frames || []).map(f =>
				({frame: f, name: `Binary ${(f.value && f.value.bin ? f.value.bin.length : 0)} bytes`}));
		}
	}
}
