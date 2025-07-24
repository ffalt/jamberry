import {Pipe, type PipeTransform} from '@angular/core';
import type {MusicBrainz} from '@jam';

@Pipe({
    name: 'mbArtistCredits',
    standalone: false
})
export class MbArtistCreditsPipe implements PipeTransform {

	transform(value?: Array<MusicBrainz.ArtistCredit>): string {
		if (value === undefined || value === null || value.length === 0) {
			return '';
		}
		return value.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}
}
