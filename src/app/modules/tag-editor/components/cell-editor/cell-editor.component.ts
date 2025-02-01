import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	EventEmitter,
	forwardRef,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
	Type,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {CellEditor} from '@app/modules/tag-editor/components/cell-editor/cell-editor.class';
import {FrameType} from '@app/modules/tag-editor/model/id3v2-frames.helper';
import {ID3v2Frames} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Id3v2ValuePicTypes, RawTagEditCell, RawTagEditFrame} from '../../model/tag-editor.types';
import {CellEditorTxtComponent} from '../cell-editor-txt/cell-editor-txt.component';
import {DialogTagImageComponent, PicEdit} from '../dialog-tag-image/dialog-tag-image.component';
import {DialogTagLyricsComponent, LyricsEdit} from '../dialog-tag-lyrics/dialog-tag-lyrics.component';

@Component({
    selector: 'app-cell-editor',
    templateUrl: './cell-editor.component.html',
    styleUrls: ['./cell-editor.component.scss'],
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    providers: [{ provide: CellEditor, useExisting: forwardRef(() => CellEditorComponent) }],
    standalone: false
})
export class CellEditorComponent extends CellEditor implements OnChanges, OnDestroy {
	@Input() cell?: RawTagEditCell = undefined;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell; event: KeyboardEvent }>();
	lines: Array<string> = [];
	inactive: boolean = true;

	@ViewChild('cellContainer', {static: false, read: ViewContainerRef}) container?: ViewContainerRef;
	protected unsubscribe = new Subject<void>();
	private componentRef?: ComponentRef<any>;

	constructor(private dialogOverlay: DialogOverlayService, private resolver: ComponentFactoryResolver) {
		super();
	}

	ngOnDestroy(): void {
		this.clearEdit();
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	@HostListener('click', ['$event'])
	clickEvent(): void {
		this.edit();
	}

	onCellEditorNavigationKeyDown(data: { cell: RawTagEditCell; event: KeyboardEvent }): void {
		this.navigKeyDownRequest.emit(data);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.cell) {
			this.display();
		}
	}

	navigTo(): void {
		// override
	}

	private static picFrameToString(frame: ID3v2Frames.Pic): string {
		return Id3v2ValuePicTypes[frame.value.pictureType] || 'image';
	}

	private static popularimeterFrameToString(frame: ID3v2Frames.Popularimeter): string {
		return `${frame.value.rating} - ${frame.value.email} - ${frame.value.count}`;
	}

	private static boolFrameToString(frame: ID3v2Frames.Bool): string {
		return `${frame.value.bool}`;
	}

	private static textListFrameToString(frame: ID3v2Frames.TextList): string {
		return frame.value.list.join('\n');
	}

	private static textFrameToString(frame: ID3v2Frames.Text): string {
		return frame.value.text;
	}

	private static idTextFrameToString(frame: ID3v2Frames.IdText): string {
		return frame.value.text;
	}

	private static playCounterFrameToString(frame: ID3v2Frames.Num): string {
		return `${frame.value.num}`;
	}

	private static geobFrameToString(frame: ID3v2Frames.GEOB): string {
		return `Binary ${(frame.value && frame.value.bin ? frame.value.bin.length : 0)} bytes`;
	}

	private static idBinFrameToString(frame: ID3v2Frames.IdBin): string {
		return `Binary ${(frame.value && frame.value.bin ? frame.value.bin.length : 0)} bytes`;
	}

	private static langDescFrameToString(frame: ID3v2Frames.LangDescText): string {
		return frame.value.text;
	}

	private edit(): void {
		switch (this.cell?.column.def.impl) {
			case FrameType.Filename:
			case FrameType.IdText:
			case FrameType.LangDescText:
			case FrameType.Text:
				if (this.cell.column.def.id === 'USLT') {
					this.editLyrics();
				} else {
					this.startEdit(CellEditorTxtComponent);
				}
				break;
			case FrameType.Bool:
				this.editBool();
				break;
			// 	case FrameType.TextList:
			// 		return CellEditorTxtListComponent;
			// 	case FrameType.IdBin:
			// 	case FrameType.GEOB:
			// 		return CellEditorBinComponent;
			// 	case FrameType.Bool:
			// 		return CellEditorBoolComponent;
			case FrameType.Pic:
				this.editPictures();
				break;
			// 		return CellEditorPicComponent;
			// 	case FrameType.Popularimeter:
			// 		return CellEditorPopmComponent;
			// 	case FrameType.PlayCounter:
			// 	case FrameType.MusicCDId:
			// 	case FrameType.EventTimingCodes:
			// 	case FrameType.SYLT:
			// 	case FrameType.ETCO:
			// 	case FrameType.PCST:
			// 	case FrameType.LINK:
			// 	case FrameType.AENC:
			// 	case FrameType.RVAD:
			// 	case FrameType.RGAD:
			// 	case FrameType.RVAD2:
			// 	case FrameType.CTOC:
			// 	case FrameType.CHAP:
			// 	case FrameType.Unknown:
			default:
			// 		return CellEditorUnknownComponent;
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
				this.componentRef.instance.cell = this.cell;
				// eslint-disable-next-line @angular-eslint/no-lifecycle-call
				if (this.componentRef.instance.ngOnChanges) {
					// eslint-disable-next-line @angular-eslint/no-lifecycle-call
					this.componentRef.instance.ngOnChanges({cell: {current: this.cell}});
				}
				if (this.componentRef.instance.navigBlur) {
					this.componentRef.instance.navigBlur.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
						this.clearEdit();
						this.inactive = true;
					});
				}
				if (this.componentRef.instance.navigChange) {
					this.componentRef.instance.navigChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
						this.setChanged();
					});
				}
			}
		});
	}

	private clearEdit(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
		if (this.container) {
			this.container.clear();
		}
	}

	private createComponent(type: Type<any>): void {
		this.clearEdit();
		if (this.container) {
			const factory = this.resolver.resolveComponentFactory(type);
			this.componentRef = this.container.createComponent(factory);
		}
	}

	private editBool(): void {
		if (this.cell) {
			if (this.cell.frames.length === 0) {
				this.cell.frames.push({id: this.cell.column.def.id, value: {bool: false}});
			}
			this.cell.frames[0].value.bool = !this.cell.frames[0].value.bool;
			this.setChanged();
		}
	}

	private setChanged(): void {
		if (this.cell) {
			this.cell.changed = true;
			this.cell.parent.changed = true;
			this.display();
		}
	}

	private editPictures(): void {
		const cell = this.cell;
		if (cell) {
			const data: PicEdit = {frames: cell.frames};
			this.dialogOverlay.open({
				title: 'Tag Pictures',
				childComponent: DialogTagImageComponent,
				data,
				onOkBtn: async () => {
					cell.frames = data.result || [];
					this.setChanged();
					return Promise.resolve();
				},
				onCancelBtn: async () => Promise.resolve()
			});
		}
	}

	private editLyrics(): void {
		const cell = this.cell;
		if (cell) {
			const data: LyricsEdit = {frames: cell.frames};
			this.dialogOverlay.open({
				title: 'Tag Lyrics',
				childComponent: DialogTagLyricsComponent,
				data,
				panelClass: 'overlay-panel-large-buttons',
				onOkBtn: async () => {
					cell.frames = data.result ? data.result.filter(f => f.value.text.length > 0) : [];
					this.setChanged();
					return Promise.resolve();
				},
				onCancelBtn: async () => Promise.resolve()
			});
		}
	}

	private display(): void {
		this.lines = this.cell ? this.cell.frames.map(f => this.frameToString(f)) : [];
	}

	// eslint-disable-next-line complexity
	private frameToString(frame: RawTagEditFrame): string {
		switch (this.cell?.column.def.impl) {
			case FrameType.Filename:
			case FrameType.Text:
				return CellEditorComponent.textFrameToString(frame);
			case FrameType.LangDescText:
				return CellEditorComponent.langDescFrameToString(frame);
			case FrameType.IdText:
				return CellEditorComponent.idTextFrameToString(frame);
			case FrameType.Pic:
				return CellEditorComponent.picFrameToString(frame);
			case FrameType.TextList:
				return CellEditorComponent.textListFrameToString(frame);
			case FrameType.IdBin:
				return CellEditorComponent.idBinFrameToString(frame);
			case FrameType.GEOB:
				return CellEditorComponent.geobFrameToString(frame);
			case FrameType.Bool:
				return CellEditorComponent.boolFrameToString(frame);
			case FrameType.Popularimeter:
				return CellEditorComponent.popularimeterFrameToString(frame);
			case FrameType.PlayCounter:
				return CellEditorComponent.playCounterFrameToString(frame);
			case FrameType.MusicCDId:
			case FrameType.EventTimingCodes:
			case FrameType.SYLT:
			case FrameType.ETCO:
			case FrameType.PCST:
			case FrameType.LINK:
			case FrameType.AENC:
			case FrameType.RVAD:
			case FrameType.RGAD:
			case FrameType.RVAD2:
			case FrameType.CTOC:
			case FrameType.CHAP:
			case FrameType.Unknown:
			default:
				return `TODO CELLEDITOR: ${this.cell?.column.def.name}`;
		}
	}

}
