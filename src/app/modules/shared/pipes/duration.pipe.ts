import {Pipe, PipeTransform} from '@angular/core';
import {formatDuration} from '@app/utils/formatters';

@Pipe({
    name: 'duration',
    standalone: false
})
export class DurationPipe implements PipeTransform {

	transform(value: string | number): string {
		if (typeof value === 'undefined' || value === null) {
			return '';
		}
		const parsedValue = Number(value);
		if (isNaN(parsedValue) || parsedValue < 0) {
			return '';
		}
		if (parsedValue === 0) {
			return '00:00';
		}
		return formatDuration(parsedValue);
	}
}
