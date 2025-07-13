import type {InputSignal} from '@angular/core';
import type {RawTagEditCell} from '@app/modules/tag-editor/model/tag-editor.types';

export abstract class CellEditor {
	cell?: InputSignal<RawTagEditCell>;

	abstract navigTo(): void;
}
