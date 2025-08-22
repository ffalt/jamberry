import { Pipe, type PipeTransform } from '@angular/core';
import { formatFileSize } from '@utils/formatters';

@Pipe({ name: 'filesize' })
export class FilesizePipe implements PipeTransform {
	transform(value?: number): string {
		if (value === undefined) {
			return '';
		}
		return formatFileSize(value);
	}
}
