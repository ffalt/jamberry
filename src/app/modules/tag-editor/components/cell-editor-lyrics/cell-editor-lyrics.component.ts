import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {DialogTagLyricsComponent, LyricsEdit} from '@app/modules/tag-editor/components/dialog-tag-lyrics/dialog-tag-lyrics.component';
import {isEnterKey} from '@app/utils/keys';
import {RawTagEditCell} from '../../model/tag-editor.types';

@Component({
	selector: 'app-cell-editor-lyrics',
	templateUrl: './cell-editor-lyrics.component.html',
	styleUrls: ['./cell-editor-lyrics.component.scss'],
	providers: [{provide: CellEditor, useExisting: forwardRef(() => CellEditorLyricsComponent)}]
})
export class CellEditorLyricsComponent extends CellEditor implements OnChanges {
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();

	constructor(private dialogOverlay: DialogOverlayService, private element: ElementRef) {
		super();
	}

	navigTo(): void {
		if (this.element) {
			this.element.nativeElement.focus();
		}
	}

	@HostListener('click', ['$event'])
	clickEvent(event: MouseEvent): void {
		this.editLyrics();
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		if (isEnterKey(event)) {
			this.editLyrics();
		} else {
			this.onNavigKeyDown(event);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeCell(this.cell);
	}

	onNavigKeyDown(event: KeyboardEvent): void {
		this.navigKeyDownRequest.emit({cell: this.cell, event});
	}

	editLyrics(): void {
		const data: LyricsEdit = {frames: this.cell.frames};
		this.dialogOverlay.open({
			title: 'Tag Lyrics',
			childComponent: DialogTagLyricsComponent,
			data,
			panelClass: 'overlay-panel-large-buttons',
			onOkBtn: async () => {
				this.cell.frames = data.result.filter(f => f.value.text.length > 0);
				this.cell.changed = true;
				this.cell.parent.changed = true;
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	protected changeCell(cell: RawTagEditCell): void {
		// this.lyrics = cell ? (cell.frames || []) : [];
	}

}
