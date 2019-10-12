import {Component, OnInit} from '@angular/core';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-admin-artists',
	templateUrl: 'admin-artists.component.html',
	styleUrls: ['admin-artists.component.scss']
})
export class AdminArtistsComponent implements OnInit {
	artists: Array<Jam.Artist> = [];

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

	ngOnInit(): void {
		this.refresh();
	}

	refresh(): void {
		this.jam.artist.search({})
			.then(data => {
				this.display(data.items);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private display(data: Array<Jam.Artist>): void {
		this.artists = (data || []).sort((a, b) => a.name.localeCompare(b.name));
	}
}
