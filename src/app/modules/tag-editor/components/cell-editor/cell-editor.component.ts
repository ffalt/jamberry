import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FrameType} from '../../model/id3v2-frames.helper';
import {RawTagEditCell} from '../../model/tag-editor.types';

// TODO: Lifecycle and change detection is not working when creating the components dynamically. Why, what's wrong? Use a giant ngSwitch in the meanwhile

@Component({
	selector: 'app-cell-editor',
	templateUrl: 'cell-editor.component.html',
	styleUrls: ['cell-editor.component.scss']
})
export class CellEditorComponent {
	FrameType = FrameType;
	@Input() cell: RawTagEditCell;
	@Output() readonly navigKeyDownRequest = new EventEmitter<{ cell: RawTagEditCell, event: KeyboardEvent }>();
	// @ViewChild('cellContainer', {static: true, read: ViewContainerRef}) container: ViewContainerRef;
	// private componentRef: ComponentRef<any>;

	// constructor(private resolver: ComponentFactoryResolver) {
	//
	// }
	//
	// ngOnDestroy(): void {
	// 	this.componentRef.destroy();
	// }

	onCellEditorNavigationKeyDown(data: { cell: RawTagEditCell, event: KeyboardEvent }): void {
		this.navigKeyDownRequest.emit(data);
	}

	/*
		private createComponent(type: Type<any>): void {
			this.container.clear();
			const factory = this.resolver.resolveComponentFactory(type);
			this.componentRef = this.container.createComponent(factory);
		}

		ngOnChanges(changes: SimpleChanges): void {
			if (changes.cell) {
				this.display();
			}
		}

		private getEditorComponent(): Type<any> | undefined {
			switch (this.cell.column.def.impl) {
				case FrameType.Filename:
				case FrameType.IdText:
				case FrameType.LangDescText:
				case FrameType.Text:
					return CellEditorTxtComponent;
				case FrameType.TextList:
					return CellEditorTxtListComponent;
				case FrameType.IdBin:
				case FrameType.GEOB:
					return CellEditorBinComponent;
				case FrameType.Bool:
					return CellEditorBoolComponent;
				case FrameType.Pic:
					return CellEditorPicComponent;
				case FrameType.Popularimeter:
					return CellEditorPopmComponent;
				case FrameType.PlayCounter:
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
					return CellEditorUnknownComponent;
			}
		}

		private display(): void {
			this.createComponent(this.getEditorComponent());
			this.componentRef.instance.cell = this.cell;
			if (this.componentRef.instance.ngOnChanges) {
				this.componentRef.instance.ngOnChanges({cell: {current: this.cell}});
			}
		}
	 */
}
