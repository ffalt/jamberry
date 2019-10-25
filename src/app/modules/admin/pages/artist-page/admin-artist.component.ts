import {AdminBaseViewIdComponent} from '@admin/components/admin-base-view-id/admin-base-view-id.component';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-admin-artist',
	templateUrl: './admin-artist.component.html',
	styleUrls: ['./admin-artist.component.scss']
})
export class AdminArtistComponent extends AdminBaseViewIdComponent {
	artist: Jam.Artist;

	constructor(route: ActivatedRoute, private app: AppService, private jam: JamService, private notify: NotifyService) {
		super(route);
	}

	refresh(): void {
		this.jam.artist.id({
			id: this.id,
			artistAlbums: true,
			artistInfo: true
		})
			.then(data => {
				this.display(data);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private display(data: Jam.Artist): void {
		this.artist = data;
	}
}
