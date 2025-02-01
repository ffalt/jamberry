import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'limit',
    standalone: false
})
export class LimitPipe implements PipeTransform {

	transform(value: string | undefined, chars: number): string {
		if (!value || isNaN(chars)) {
			return '';
		}
		if (chars <= 0) {
			return '';
		}
		if (value.length < chars) {
			return value;
		}
		const result = value.slice(0, chars - 1).trim();
		return `${result}…`;
	}

}
