import {Pipe, type PipeTransform} from '@angular/core';
import {formatFileSize} from '@app/utils/formatters';

@Pipe({
    name: 'filesize',
    standalone: false
})
export class FilesizePipe implements PipeTransform {

	transform(value?: number): string {
		if (value === undefined || value === null) {
			return '';
		}
		return formatFileSize(value);
	}
}
