import {Pipe, PipeTransform} from '@angular/core';
import {AlbumType} from '@jam';

@Pipe({name: 'artistsOrSeries'})
export class ArtistsOrSeriesPipe implements PipeTransform {

	transform(value: AlbumType): string {
		return value === AlbumType.series ? 'Series' : 'Artists';
	}

}
