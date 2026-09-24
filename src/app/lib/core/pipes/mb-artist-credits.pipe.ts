import { Pipe, type PipeTransform } from '@angular/core';
import type { MusicBrainz } from '@jam';

@Pipe({ name: 'mbArtistCredits' })
export class MbArtistCreditsPipe implements PipeTransform {
	transform(value?: Array<MusicBrainz.ArtistCredit>): string {
		return value === undefined || value.length === 0 ? '' : value.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}
}
