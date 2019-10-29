import {Pipe, PipeTransform} from '@angular/core';
import {Id3v2ValuePicTypes} from '../model/tag-editor.types';

@Pipe({name: 'picType'})
export class PicTypePipe implements PipeTransform {

	transform(value: number): string {
		return Id3v2ValuePicTypes[value] || 'image';
	}

}
