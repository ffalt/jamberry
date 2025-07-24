import {Component, type OnChanges, inject, input} from '@angular/core';
import {NotifyService} from '@core/services';
import {type Jam, JamService, type MusicBrainz, MusicBrainzLookupType} from '@jam';

export interface ReleaseGroup {
	group: MusicBrainz.ReleaseGroupBase;
	album?: Jam.Album;
}

export interface ReleaseGroupGroup {
	groups: Array<ReleaseGroup>;
	type: string;
}

@Component({
	selector: 'app-mb-artist',
	templateUrl: './mb-artist.component.html',
	styleUrls: ['./mb-artist.component.scss'],
	standalone: false
})
export class MbArtistComponent implements OnChanges {
	readonly mbArtistID = input<string>();
	mbArtist?: MusicBrainz.Artist;
	releaseGroups: Array<ReleaseGroupGroup> = [];
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const mbArtistID = this.mbArtistID();
		if (mbArtistID) {
			this.jam.metadata.musicbrainzLookup({type: MusicBrainzLookupType.artist, mbID: mbArtistID})
				.then(data => {
					this.display(data.data.artist);
				})
				.catch(error => this.notify.error(error));
		}
	}

	displayReleaseGroups(mbArtist: MusicBrainz.Artist): void {
		this.releaseGroups = [];
		if (mbArtist.releaseGroups) {
			for (const r of mbArtist.releaseGroups) {
				const type = [r.primaryType, ...(r.secondaryTypes || [])].join(' / ');
				let typeGroup = this.releaseGroups.find(g => g.type === type);
				if (!typeGroup) {
					typeGroup = {groups: [], type};
					this.releaseGroups.push(typeGroup);
				}
				typeGroup.groups.push({group: r});
			}
		}
		for (const g of this.releaseGroups) {
			g.groups.sort((a, b) =>
				(b.group.firstReleaseDate || '').localeCompare(a.group.firstReleaseDate || ''));
		}
		this.releaseGroups.sort((a, b) => a.type.localeCompare(b.type));
	}

	display(mbArtist: MusicBrainz.Artist): void {
		this.mbArtist = mbArtist;
		this.releaseGroups = [];
		if (!mbArtist) {
			return;
		}
		this.displayReleaseGroups(mbArtist);
	}
}
