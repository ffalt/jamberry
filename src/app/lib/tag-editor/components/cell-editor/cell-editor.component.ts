import { Component, type ComponentRef, DestroyRef, effect, forwardRef, inject, input, output, signal, type Type, viewChild, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { CellEditor } from './cell-editor.class';
import { FrameType } from '../../model/id3v2-frames.helper';
import type { Jam } from '@jam';
import { Id3v2ValuePicTypes, type RawTagEditCell, type RawTagEditFrame } from '../../model/tag-editor.types';
import { CellEditorTxtComponent } from '../cell-editor-txt/cell-editor-txt.component';
import { DialogTagImageComponent, type PicEdit } from '../dialog-tag-image/dialog-tag-image.component';
import { DialogTagLyricsComponent, type LyricsEdit } from '../dialog-tag-lyrics/dialog-tag-lyrics.component';
import { DialogTagSyncedLyricsComponent, type SyncedLyricsEdit, type SyncedLyricsValue } from '../dialog-tag-synced-lyrics/dialog-tag-synced-lyrics.component';
import { DialogTagMcdiComponent, type McdiEdit } from '../dialog-tag-mcdi/dialog-tag-mcdi.component';
import { CellEditorDisplayComponent } from '../cell-editor-display/cell-editor-display.component';
import { ArrayBufferFromBase64 } from '@utils/base64';

@Component({
	selector: 'app-cell-editor',
	templateUrl: './cell-editor.component.html',
	providers: [{ provide: CellEditor, useExisting: forwardRef(() => CellEditorComponent) }],
	host: {
		'(click)': 'clickEvent()'
	},
	imports: [CellEditorDisplayComponent]
})
export class CellEditorComponent extends CellEditor {
	readonly navigKeyDownRequest = output<{
		cell: RawTagEditCell<any>;
		event: KeyboardEvent;
	}>();

	readonly container = viewChild('cellContainer', { read: ViewContainerRef });
	readonly cell = input<RawTagEditCell<any>>();
	readonly lines = signal<Array<string>>([]);
	readonly tooltips = signal<Array<string>>([]);
	readonly inactive = signal(true);
	private readonly lifeRef = inject(DestroyRef);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private componentRef?: ComponentRef<CellEditorTxtComponent>;

	constructor() {
		super();
		effect(() => {
			this.display();
		});
		this.lifeRef.onDestroy(() => {
			this.clearEdit();
		});
	}

	clickEvent(): void {
		this.edit();
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
		return String(frame.value.bool);
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
		return String(frame.value.num);
	}

	private static geobFrameToString(frame: Jam.MediaTagRawFrameGEOB): string {
		return `Binary ${(frame.value.bin.length)} bytes`;
	}

	private static idBinFrameToString(frame: Jam.MediaTagRawFrameIdBin): string {
		return `Binary ${(frame.value.bin.length)} bytes`;
	}

	private static musicCDIdFrameToString(frame: Jam.MediaTagRawFrameBin): string {
		try {
			const bytes = ArrayBufferFromBase64(frame.value.bin);
			if (bytes.length >= 4) {
				const firstTrack = bytes[2];
				const lastTrack = bytes[3];
				const trackCount = lastTrack - firstTrack + 1;
				return `${trackCount} track${trackCount === 1 ? '' : 's'} (${firstTrack}-${lastTrack})`;
			}
		} catch {
			// fall through
		}
		return `Binary ${frame.value.bin.length} bytes`;
	}

	private static privFrameToString(frame: Jam.MediaTagRawFramePriv): string {
		const v = frame.value;
		if (v.guid !== undefined) {
			return v.guid;
		}
		return v.num === undefined ? v.text ?? `Binary ${v.bin?.length ?? 0} bytes` : String(v.num);
	}

	private static langDescFrameToString(frame: Jam.MediaTagRawFrameLangDescText): string {
		return frame.value.text;
	}

	private static langTextFrameToString(frame: Jam.MediaTagRawFrameLangText): string {
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
			case FrameType.MusicCDId: {
				this.editMusicCDId();
				break;
			}
			case FrameType.SYLT: {
				this.editSyncedLyrics();
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
			// case FrameType.EventTimingCodes:
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
		if (!this.inactive()) {
			return;
		}
		this.inactive.set(false);
		setTimeout(() => {
			this.createComponent(type);
			if (!this.componentRef) {
				return;
			}

			this.componentRef.instance.cell = this.cell();
			this.componentRef.instance.changeCell(this.cell());
			this.componentRef.instance.navigBlur.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(() => {
					this.clearEdit();
					this.inactive.set(true);
				});
			this.componentRef.instance.navigChange.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(() => {
					this.setChanged();
				});
		}, 0);
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
		if (!cell) {
			return;
		}

		if (cell.frames.length === 0) {
			cell.frames.push({ id: cell.column.def.id, value: { bool: false } });
		}
		cell.frames[0].value.bool = !cell.frames[0].value.bool;
		this.setChanged();
	}

	private setChanged(): void {
		const cell = this.cell();
		if (!cell) {
			return;
		}

		cell.changed = true;
		cell.parent.changed = true;
		this.display();
	}

	private editPictures(): void {
		const cell = this.cell();
		if (!cell) {
			return;
		}

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

	private editMusicCDId(): void {
		const cell = this.cell();
		if (!cell) {
			return;
		}

		const data: McdiEdit = { frames: cell.frames };
		this.dialogOverlay.open<McdiEdit>({
			childComponent: DialogTagMcdiComponent,
			title: 'Music CD Identifier',
			data,
			onOkBtn: async () => Promise.resolve(),
			onCancelBtn: async () => Promise.resolve()
		});
	}

	private editLyrics(): void {
		const cell = this.cell();
		if (!cell) {
			return;
		}

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

	private editSyncedLyrics(): void {
		const cell: RawTagEditCell<SyncedLyricsValue> | undefined = this.cell();
		if (!cell) {
			return;
		}
		const data: SyncedLyricsEdit = { frames: cell.frames, description: cell.column.def.subid };
		this.dialogOverlay.open<SyncedLyricsEdit>({
			childComponent: DialogTagSyncedLyricsComponent,
			title: 'Tag Synced Lyrics',
			data,
			panelClass: 'overlay-panel-synced-lyrics',
			onOkBtn: async () => {
				if (!data.validate?.()) {
					return Promise.reject(new Error('Invalid synced lyrics timestamps'));
				}
				let result = data.result ?? [];
				if (cell.frames.length === 0 && result.length === 1 && result[0].value.events.length === 0) {
					result = [];
				}
				if (JSON.stringify(cell.frames) !== JSON.stringify(result)) {
					for (const frame of result) {
						const original = cell.frames.find(item => item.id === frame.id && item.value.id === frame.value.id &&
							item.value.language === frame.value.language && item.value.contentType === frame.value.contentType);
						if (JSON.stringify(original?.value.events) !== JSON.stringify(frame.value.events)) {
							frame.value.events.sort((a, b) => a.timestamp - b.timestamp);
						}
					}
					cell.frames = result;
					cell.changed = true;
					cell.parent.changed = true;
					if (this.cell() === cell) {
						this.display();
					}
				}
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}

	private display(): void {
		const cell = this.cell();
		this.lines.set(cell ? cell.frames.map(frame => this.frameToString(frame)) : []);
		this.tooltips.set(cell ? cell.frames.map(frame => this.frameToTooltip(frame)) : []);
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
			case FrameType.LangText: {
				return CellEditorComponent.langTextFrameToString(frame);
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
			case FrameType.PRIV: {
				return CellEditorComponent.privFrameToString(frame);
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
			case FrameType.MusicCDId: {
				return CellEditorComponent.musicCDIdFrameToString(frame);
			}
			case FrameType.SYLT: {
				const value = frame.value as { events: Array<{ text: string }> };
				return `${value.events.length} synced lines`;
			}
			default: {
				return `Not implemented celleditor for: ${cell?.column.def.name}`;
			}
		}
	}

	private frameToTooltip(frame: RawTagEditFrame<any>): string {
		const cell = this.cell();
		if (cell?.column.def.impl !== FrameType.SYLT) {
			return this.frameToString(frame);
		}
		const maxAmount = 15;
		const value = frame.value as SyncedLyricsValue;
		const preview = value.events.slice(0, maxAmount).map(event => event.text).join('\n');
		return value.events.length > maxAmount ? `${preview}\n…` : preview;
	}
}
