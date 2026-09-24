import { Pipe, type PipeTransform } from '@angular/core';
import { formatDuration } from '@utils/formatters';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
	transform(value?: string | number): string {
		if (value === undefined) {
			return '';
		}
		const parsedValue = Number(value);
		if (Number.isNaN(parsedValue) || parsedValue < 0) {
			return '';
		}
		return parsedValue === 0 ? '00:00' : formatDuration(parsedValue);
	}
}
