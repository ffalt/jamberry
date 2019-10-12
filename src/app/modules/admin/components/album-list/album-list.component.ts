import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Jam} from '@jam';
import {JamDataSource} from '../../model/data-source';

@Component({
	selector: 'app-admin-album-list',
	templateUrl: 'album-list.component.html',
	styleUrls: ['album-list.component.scss']
})
export class AlbumListComponent implements OnChanges {
	@Input() albums: Array<Jam.Album> = [];
	dataSource: JamDataSource<Jam.Album>;
	displayedColumns: Array<string> = ['name', 'artist', 'albumType', 'year', 'tracks', 'duration'];

	getSortValue(column: string, album: Jam.Album): string | number | undefined {
		switch (column) {
			case 'name':
				return album.name;
			case 'artist':
				return album.artist;
			case 'albumType':
				return album.albumType;
			case 'year':
				return album.tag.year;
			case 'tracks':
				return album.trackCount;
			case 'duration':
				return album.tag.duration;
			default:
				return;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.albums) {
			this.dataSource = new JamDataSource<Jam.Album>(this.albums, this.getSortValue.bind(this));
		}
	}

}
