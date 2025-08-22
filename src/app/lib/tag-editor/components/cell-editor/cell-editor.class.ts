import type { InputSignal } from '@angular/core';
import type { RawTagEditCell } from '../../model/tag-editor.types';

export abstract class CellEditor {
	cell!: InputSignal<RawTagEditCell<any> | undefined>;

	abstract navigTo(): void;
}
