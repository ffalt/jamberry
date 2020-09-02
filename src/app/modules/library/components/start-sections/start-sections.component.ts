import {Component, OnInit} from '@angular/core';
import {NavigService, NotifyService} from '@core/services';
import {JamService, ListType} from '@jam';
import {StartSectionItem} from '@library/components';

@Component({
	selector: 'app-start-sections',
	templateUrl: './start-sections.component.html',
	styleUrls: ['./start-sections.component.scss']
})
export class StartSectionsComponent implements OnInit {
	data: {
		artistRecent?: Array<StartSectionItem>;
		artistFaved?: Array<StartSectionItem>;
		albumFaved?: Array<StartSectionItem>;
		albumRecent?: Array<StartSectionItem>;
	} = {};

	constructor(public jam: JamService, protected notify: NotifyService, public navig: NavigService) {
	}

	ngOnInit(): void {
		this.jam.artist.search({list: ListType.recent, take: 5})
			.then(data => {
				this.data.artistRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.artist.search({list: ListType.faved, take: 5})
			.then(data => {
				this.data.artistFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.search({list: ListType.faved, take: 5})
			.then(data => {
				this.data.albumFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
		this.jam.album.search({list: ListType.recent, take: 5})
			.then(data => {
				this.data.albumRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

}
