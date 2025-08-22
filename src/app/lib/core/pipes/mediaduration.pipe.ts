import { Pipe, type PipeTransform } from '@angular/core';
import { formatDuration } from '@utils/formatters';

@Pipe({ name: 'mediaduration' })
export class MediadurationPipe implements PipeTransform {
	transform(value?: string | number): string {
		if (value === undefined) {
			return '';
		}
		return formatDuration(Number(value));
	}
}
