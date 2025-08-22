import { Component, inject, type OnInit } from '@angular/core';
import { JamService, ListType } from '@jam';
import { StartSectionComponent, type StartSectionItem } from '../start-section/start-section.component';
import { NavigService } from '@core/services/navig/navig.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-start-sections',
	templateUrl: './start-sections.component.html',
	styleUrls: ['./start-sections.component.scss'],
	imports: [StartSectionComponent]
})
export class StartSectionsComponent implements OnInit {
	data: {
		artistRecent?: Array<StartSectionItem>;
		artistFaved?: Array<StartSectionItem>;
		albumFaved?: Array<StartSectionItem>;
		albumRecent?: Array<StartSectionItem>;
	} = {};

	private readonly jam = inject(JamService);
	private readonly navig = inject(NavigService);
	private readonly notify = inject(NotifyService);

	ngOnInit(): void {
		this.jam.artist.search({ list: ListType.recent, take: 5 })
			.then(data => {
				this.data.artistRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
		this.jam.artist.search({ list: ListType.faved, take: 5 })
			.then(data => {
				this.data.artistFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toArtist(obj);
					}
				}));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
		this.jam.album.search({ list: ListType.faved, take: 5 })
			.then(data => {
				this.data.albumFaved = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
		this.jam.album.search({ list: ListType.recent, take: 5 })
			.then(data => {
				this.data.albumRecent = data.items.map(obj => ({
					obj, click: (): void => {
						this.navig.toAlbum(obj);
					}
				}));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
