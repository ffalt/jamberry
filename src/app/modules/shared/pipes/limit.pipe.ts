import {Pipe, type PipeTransform} from '@angular/core';

@Pipe({
    name: 'limit',
    standalone: false
})
export class LimitPipe implements PipeTransform {

	transform(value: string | undefined, chars: number): string {
		if (!value || Number.isNaN(chars)) {
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
