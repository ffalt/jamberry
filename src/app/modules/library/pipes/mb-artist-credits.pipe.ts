import {Pipe, PipeTransform} from '@angular/core';
import {MusicBrainz} from '@jam';

@Pipe({name: 'mbArtistCredits'})
export class MbArtistCreditsPipe implements PipeTransform {

	transform(value: Array<MusicBrainz.ArtistCredit>): string {
		if (typeof value === 'undefined' || value === null || value.length === 0) {
			return '';
		}
		return value.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}

}
