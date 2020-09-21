import {Component, OnInit} from '@angular/core';
import {NavigService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {LibraryService} from '@library/services';

@Component({
	selector: 'app-page-genres',
	templateUrl: './genres-page.component.html',
	styleUrls: ['./genres-page.component.scss']
})
export class GenresPageComponent implements OnInit {
	genres?: Array<Jam.Genre>;

	constructor(protected jam: JamService, protected notify: NotifyService, public library: LibraryService, public navig: NavigService) {
	}

	loadGenres(): void {
		this.jam.genre.search({})
			.then(data => {
				this.genres = data.items;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	ngOnInit(): void {
		this.loadGenres();
	}
}
