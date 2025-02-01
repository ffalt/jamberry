import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'json',
    standalone: false
})
export class JsonPipe implements PipeTransform {

	transform(value: any): string {
		return JSON.stringify(value, undefined, ' ');
	}

}
