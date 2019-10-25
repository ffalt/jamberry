import {Pipe, PipeTransform} from '@angular/core';
import {AlbumType, Jam} from '@jam';

@Pipe({name: 'artistOrSeries'})
export class ArtistOrSeriesPipe implements PipeTransform {

	transform(value: Jam.Artist): string {
		return (value.albumTypes.length === 1 && value.albumTypes.includes(AlbumType.series)) ? 'Series' : 'Artist';
	}

}
