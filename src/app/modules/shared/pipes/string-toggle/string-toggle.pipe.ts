import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stringToggle'})
export class StringTogglePipe implements PipeTransform {

	transform(value: any, ifTrue: string, ifFalse: string): string {
		return value ? ifTrue : ifFalse;
	}

}
