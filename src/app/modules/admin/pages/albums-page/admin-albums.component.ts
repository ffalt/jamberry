import {Component, OnInit} from '@angular/core';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-admin-albums',
	templateUrl: 'admin-albums.component.html',
	styleUrls: ['admin-albums.component.scss']
})
export class AdminAlbumsComponent implements OnInit {
	albums: Array<Jam.Album> = [];

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService) {
	}

	ngOnInit(): void {
		this.refresh();
	}

	refresh(): void {
		this.jam.album.search({})
			.then(data => {
				this.display(data.items);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private display(data: Array<Jam.Album>): void {
		this.albums = (data || []).sort((a, b) => {
			let result = a.name.localeCompare(b.name);
			if (result === 0) {
				if (!a.artist) {
					return 1;
				}
				if (!b.artist) {
					return -1;
				}
				result = a.artist.localeCompare(b.artist);
			}
			return result;
		});
	}
}
