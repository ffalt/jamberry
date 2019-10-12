import {Component, OnInit} from '@angular/core';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {JamDataSource} from '../../model/data-source';

@Component({
	selector: 'app-admin-genres',
	templateUrl: 'admin-genres.component.html',
	styleUrls: ['admin-genres.component.scss']
})
export class AdminGenresComponent implements OnInit {
	tracks: Array<Jam.Track>;
	genres: Array<Jam.Genre>;
	dataSource: JamDataSource<Jam.Genre>;
	displayedColumns: Array<string> = ['name', 'tracks'];

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

	ngOnInit(): void {
		this.refresh();
	}

	refresh(): void {
		this.jam.various.genre_list({})
			.then(data => {
				this.display(data.items);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	getSortValue(column: string, genre: Jam.Genre): string | number | undefined {
		switch (column) {
			case 'name':
				return genre.name;
			case 'tracks':
				return genre.trackCount;
			case 'artists':
				return genre.artistCount;
			case 'albums':
				return genre.albumCount;
			default:
				return;
		}
	}

	display(data: Array<Jam.Genre>): void {
		this.genres = data.sort((a, b) => a.name.localeCompare(b.name));
		this.dataSource = new JamDataSource<Jam.Genre>(this.genres, this.getSortValue.bind(this));
	}

	displayGenre(genre: Jam.Genre): void {
		this.jam.track.search({genre: genre.name, trackTag: true, trackMedia: true})
			.then(data => this.tracks = data.items)
			.catch(e => {
				this.notify.error(e);
			});
	}
}
