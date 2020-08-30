import {Pipe, PipeTransform} from '@angular/core';
import {formatDuration} from '@app/utils/formatters';

@Pipe({name: 'mediaduration'})
export class MediadurationPipe implements PipeTransform {

	transform(value?: string | number): string {
		if (value === undefined || value === null) {
			return '';
		}
		return formatDuration(Number(value));
	}

}
