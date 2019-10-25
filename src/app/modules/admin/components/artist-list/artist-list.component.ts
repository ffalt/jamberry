import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Jam} from '@jam';
import {JamDataSource} from '../../model/data-source';

@Component({
	selector: 'app-admin-artist-list',
	templateUrl: './artist-list.component.html',
	styleUrls: ['./artist-list.component.scss']
})
export class AdminArtistListComponent implements OnChanges {
	dataSource: JamDataSource<Jam.Artist>;
	displayedColumns: Array<string> = ['name', 'albums', 'albumTypes', 'tracks'];
	@Input() artists: Array<Jam.Artist> = [];

	constructor(private router: Router) {
	}

	getSortValue(column: string, artist: Jam.Artist): string | number | undefined {
		switch (column) {
			case 'name':
				return artist.name;
			case 'albumTypes':
				return artist.albumTypes.join('');
			case 'albums':
				return artist.albumCount;
			case 'tracks':
				return artist.trackCount;
			default:
				break;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.artists) {
			this.dataSource = new JamDataSource<Jam.Artist>(this.artists, this.getSortValue.bind(this));
		}
	}

	toArtist(artist: Jam.Artist): void {
		this.router.navigate(['/admin/artist/' + artist.id])
			.catch(e => {
				console.error(e);
			});
	}

}
