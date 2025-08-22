import { Component, type ComponentRef, forwardRef, inject, input, type OnChanges, type OnDestroy, output, type Type, viewChild, ViewContainerRef } from '@angular/core';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { CellEditor } from './cell-editor.class';
import { FrameType } from '../../model/id3v2-frames.helper';
import type { Jam } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { Id3v2ValuePicTypes, type RawTagEditCell, type RawTagEditFrame } from '../../model/tag-editor.types';
import { CellEditorTxtComponent } from '../cell-editor-txt/cell-editor-txt.component';
import { DialogTagImageComponent, type PicEdit } from '../dialog-tag-image/dialog-tag-image.component';
import { DialogTagLyricsComponent, type LyricsEdit } from '../dialog-tag-lyrics/dialog-tag-lyrics.component';
import { CellEditorDisplayComponent } from '../cell-editor-display/cell-editor-display.component';

@Component({
	selector: 'app-cell-editor',
	templateUrl: './cell-editor.component.html',
	styleUrls: ['./cell-editor.component.scss'],
	providers: [{ provide: CellEditor, useExisting: forwardRef(() => CellEditorComponent) }],
	host: {
		'(click)': 'clickEvent()'
	},
	imports: [CellEditorDisplayComponent]
})
export class CellEditorComponent extends CellEditor implements OnChanges, OnDestroy {
	readonly navigKeyDownRequest = output<{
		cell: RawTagEditCell<any>;
		event: KeyboardEvent;
	}>();

	readonly container = viewChild('cellContainer', { read: ViewContainerRef });
	cell = input<RawTagEditCell<any>>();
	lines: Array<string> = [];
	inactive: boolean = true;
	private readonly unsubscribe = new Subject<void>();
	private readonly dialogOverlay = inject(DialogOverlayService);
	private componentRef?: ComponentRef<CellEditorTxtComponent>;

	ngOnDestroy(): void {
		this.clearEdit();
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	clickEvent(): void {
		this.edit();
	}

	ngOnChanges(): void {
		this.display();
	}

	navigTo(): void {
		// override
	}

	private static picFrameToString(frame: Jam.MediaTagRawFramePic): string {
		return Id3v2ValuePicTypes[frame.value.pictureType] || 'image';
	}

	private static popularimeterFrameToString(frame: Jam.MediaTagRawFramePopularimeter): string {
		return `${frame.value.rating} - ${frame.value.email} - ${frame.value.count}`;
	}

	private static boolFrameToString(frame: Jam.MediaTagRawFrameBool): string {
		return `${frame.value.bool}`;
	}

	private static textListFrameToString(frame: Jam.MediaTagRawFrameTextList): string {
		return frame.value.list.join('\n');
	}

	private static textFrameToString(frame: Jam.MediaTagRawFrameText): string {
		return frame.value.text;
	}

	private static idTextFrameToString(frame: Jam.MediaTagRawFrameIdText): string {
		return frame.value.text;
	}

	private static playCounterFrameToString(frame: Jam.MediaTagRawFrameNumber): string {
		return `${frame.value.num}`;
	}

	private static geobFrameToString(frame: Jam.MediaTagRawFrameGEOB): string {
		return `Binary ${(frame.value.bin.length)} bytes`;
	}

	private static idBinFrameToString(frame: Jam.MediaTagRawFrameIdBin): string {
		return `Binary ${(frame.value.bin.length)} bytes`;
	}

	private static langDescFrameToString(frame: Jam.MediaTagRawFrameLangDescText): string {
		return frame.value.text;
	}

	private edit(): void {
		const cell = this.cell();
		switch (cell?.column.def.impl) {
			case FrameType.Filename:
			case FrameType.IdText:
			case FrameType.LangDescText:
			case FrameType.Text: {
				if (cell.column.def.id === 'USLT') {
					this.editLyrics();
				} else {
					this.startEdit(CellEditorTxtComponent);
				}
				break;
			}
			case FrameType.Bool: {
				this.editBool();
				break;
			}
			case FrameType.Pic: {
				this.editPictures();
				break;
			}
			// case FrameType.TextList:
			//   return CellEditorTxtListComponent;
			// case FrameType.IdBin:
			// case FrameType.GEOB:
			//   return CellEditorBinComponent;
			// case FrameType.Bool:
			//   return CellEditorBoolComponent;
			// case FrameType.Popularimeter:
			//   return CellEditorPopmComponent;
			// case FrameType.PlayCounter:
			// case FrameType.MusicCDId:
			// case FrameType.EventTimingCodes:
			// case FrameType.SYLT:
			// case FrameType.ETCO:
			// case FrameType.PCST:
			// case FrameType.LINK:
			// case FrameType.AENC:
			// case FrameType.RVAD:
			// case FrameType.RGAD:
			// case FrameType.RVAD2:
			// case FrameType.CTOC:
			// case FrameType.CHAP:
			// case FrameType.Unknown:
			default:
			// return CellEditorUnknownComponent;
		}
	}

	private startEdit(type: Type<any>): void {
		if (!this.inactive) {
			return;
		}
		this.inactive = false;
		setTimeout(() => {
			this.createComponent(type);
			if (this.componentRef) {
				this.componentRef.instance.cell = this.cell();
				this.componentRef.instance.changeCell(this.cell());
				this.componentRef.instance.navigBlur.pipe(takeUntil(this.unsubscribe))
					.subscribe(() => {
						this.clearEdit();
						this.inactive = true;
					});
				this.componentRef.instance.navigChange.pipe(takeUntil(this.unsubscribe))
					.subscribe(() => {
						this.setChanged();
					});
			}
		});
	}

	private clearEdit(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
		const container = this.container();
		if (container) {
			container.clear();
		}
	}

	private createComponent(type: Type<any>): void {
		this.clearEdit();
		const container = this.container();
		if (container) {
			this.componentRef = container.createComponent(type);
		}
	}

	private editBool(): void {
		const cell: RawTagEditCell<{ bool: boolean }> | undefined = this.cell();
		if (cell) {
			if (cell.frames.length === 0) {
				cell.frames.push({ id: cell.column.def.id, value: { bool: false } });
			}
			cell.frames[0].value.bool = !cell.frames[0].value.bool;
			this.setChanged();
		}
	}

	private setChanged(): void {
		const cell = this.cell();
		if (cell) {
			cell.changed = true;
			cell.parent.changed = true;
			this.display();
		}
	}

	private editPictures(): void {
		const cell = this.cell();
		if (cell) {
			const data: PicEdit = { frames: cell.frames };
			this.dialogOverlay.open<PicEdit>({
				childComponent: DialogTagImageComponent,
				title: 'Tag Pictures',
				data,
				onOkBtn: async () => {
					cell.frames = (data.result ?? []) as Array<RawTagEditFrame<any>>;
					this.setChanged();
					return Promise.resolve();
				},
				onCancelBtn: async () => Promise.resolve()
			});
		}
	}

	private editLyrics(): void {
		const cell = this.cell();
		if (cell) {
			const data: LyricsEdit = { frames: cell.frames };
			this.dialogOverlay.open<LyricsEdit>({
				childComponent: DialogTagLyricsComponent,
				title: 'Tag Lyrics',
				data,
				panelClass: 'overlay-panel-large-buttons',
				onOkBtn: async () => {
					cell.frames = data.result ?
						data.result.filter(f => f.value.text.length > 0) as Array<RawTagEditFrame<any>> :
						[];
					this.setChanged();
					return Promise.resolve();
				},
				onCancelBtn: async () => Promise.resolve()
			});
		}
	}

	private display(): void {
		const cell = this.cell();
		this.lines = cell ? cell.frames.map(f => this.frameToString(f)) : [];
	}

	private frameToString(frame: RawTagEditFrame<any>): string {
		const cell = this.cell();
		switch (cell?.column.def.impl) {
			case FrameType.Filename:
			case FrameType.Text: {
				return CellEditorComponent.textFrameToString(frame);
			}
			case FrameType.LangDescText: {
				return CellEditorComponent.langDescFrameToString(frame);
			}
			case FrameType.IdText: {
				return CellEditorComponent.idTextFrameToString(frame);
			}
			case FrameType.Pic: {
				return CellEditorComponent.picFrameToString(frame);
			}
			case FrameType.TextList: {
				return CellEditorComponent.textListFrameToString(frame);
			}
			case FrameType.IdBin: {
				return CellEditorComponent.idBinFrameToString(frame);
			}
			case FrameType.GEOB: {
				return CellEditorComponent.geobFrameToString(frame);
			}
			case FrameType.Bool: {
				return CellEditorComponent.boolFrameToString(frame);
			}
			case FrameType.Popularimeter: {
				return CellEditorComponent.popularimeterFrameToString(frame);
			}
			case FrameType.PlayCounter: {
				return CellEditorComponent.playCounterFrameToString(frame);
			}
			// case FrameType.MusicCDId:
			default: {
				return `Not implemented celleditor for: ${cell?.column.def.name}`;
			}
		}
	}
}
