import {RawTagEditCell} from '@app/modules/tag-editor/model/tag-editor.types';

export abstract class CellEditor {
	cell?: RawTagEditCell;

	abstract navigTo(): void;
}
