import {Pipe, PipeTransform} from '@angular/core';
import {formatFileSize} from '@app/utils/formatters';

@Pipe({name: 'filesize'})
export class FilesizePipe implements PipeTransform {

	transform(value: number): string {
		if (typeof value === 'undefined' || value === null || value === undefined) {
			return '';
		}
		return formatFileSize(value);
	}

}
