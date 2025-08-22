import { CommonModule } from '@angular/common';
import { Component, inject, input, type OnChanges } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService, type MusicBrainz, MusicBrainzLookupType } from '@jam';
import { MbRelationsComponent } from '../mb-relations/mb-relations.component';
import { MusicbrainzIconComponent } from '@core/components/musicbrainz-icon/musicbrainz-icon.component';

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
	imports: [CommonModule, MbRelationsComponent, MusicbrainzIconComponent]
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
			this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.artist, mbID: mbArtistID })
				.then(data => {
					this.display((data.data as MusicBrainz.Response).artist);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	displayReleaseGroups(mbArtist: MusicBrainz.Artist): void {
		this.releaseGroups = [];
		if (mbArtist.releaseGroups) {
			for (const r of mbArtist.releaseGroups) {
				const type = [r.primaryType, ...(r.secondaryTypes ?? [])].join(' / ');
				let typeGroup = this.releaseGroups.find(g => g.type === type);
				if (!typeGroup) {
					typeGroup = { groups: [], type };
					this.releaseGroups.push(typeGroup);
				}
				typeGroup.groups.push({ group: r });
			}
		}
		for (const g of this.releaseGroups) {
			g.groups.sort((a, b) =>
				(b.group.firstReleaseDate ?? '').localeCompare(a.group.firstReleaseDate ?? ''));
		}
		this.releaseGroups.sort((a, b) => a.type.localeCompare(b.type));
	}

	display(mbArtist?: MusicBrainz.Artist): void {
		this.mbArtist = mbArtist;
		this.releaseGroups = [];
		if (!mbArtist) {
			return;
		}
		this.displayReleaseGroups(mbArtist);
	}
}
