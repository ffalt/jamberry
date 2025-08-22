import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({ name: 'stringToggle' })
export class StringTogglePipe implements PipeTransform {
	transform(value: any, ifTrue: string, ifFalse: string, extra?: string): string {
		return (value ? ifTrue : ifFalse) + (extra ? ` (${extra})` : '');
	}
}
