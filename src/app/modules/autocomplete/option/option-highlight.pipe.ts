import {Pipe, type PipeTransform} from '@angular/core';

@Pipe({
    name: 'highlight',
    standalone: false
})
export class HighlightPipe implements PipeTransform {
	transform(text: string, search: string): string {
		let pattern = search.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
		pattern = pattern.split(' ').filter(t => t.length > 0).join('|');
		const regex = new RegExp(pattern, 'gi');
		return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
	}
}
