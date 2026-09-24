import { Pipe, type PipeTransform } from '@angular/core';
import { formatDuration } from '@utils/formatters';

@Pipe({ name: 'mediaduration' })
export class MediadurationPipe implements PipeTransform {
	transform(value?: string | number): string {
		return value === undefined ? '' : formatDuration(Number(value));
	}
}
