import { Pipe, type PipeTransform } from '@angular/core';
import { formatFileSize } from '@utils/formatters';

@Pipe({ name: 'filesize' })
export class FilesizePipe implements PipeTransform {
	transform(value?: number): string {
		return value === undefined ? '' : formatFileSize(value);
	}
}
