import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlight',
	standalone: true
})
export class HighlightPipe implements PipeTransform {
	transform(text: string, search: string): string {
		let pattern = search.replaceAll(/[-[\]/{}()*+?.\\^$|]/g, String.raw`\$&`);
		pattern = pattern.split(' ').filter(t => t.length > 0).join('|');
		const regex = new RegExp(pattern, 'gi');
		return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
	}
}
