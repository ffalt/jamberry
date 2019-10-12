import {AdminBaseViewIdComponent} from '@admin/components/admin-base-view-id/admin-base-view-id.component';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-admin-album',
	templateUrl: 'admin-album.component.html',
	styleUrls: ['admin-album.component.scss']
})
export class AdminAlbumComponent extends AdminBaseViewIdComponent {
	album: Jam.Album;

	constructor(route: ActivatedRoute, private app: AppService, private jam: JamService, private notify: NotifyService) {
		super(route);
	}

	refresh(): void {
		this.jam.album.id({id: this.id, albumState: true, albumTracks: true, trackTag: true, trackMedia: true, albumInfo: true})
			.then(album => {
				this.display(album);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private display(album: Jam.Album): void {
		this.album = album;
	}
}
