import { SlicePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService, type MusicBrainz, MusicBrainzLookupType } from '@jam';
import { MbRelationsComponent } from '../mb-relations/mb-relations.component';
import { IconInfoComponent } from '@core/components/icons/icon-info.component';
import { IconMusicbrainzComponent } from '@core/components/icons/icon-musicbrainz.component';

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
	imports: [SlicePipe, IconInfoComponent, MbRelationsComponent, IconMusicbrainzComponent]
})
export class MbArtistComponent {
	readonly mbArtistID = input<string>();
	readonly mbArtist = signal<MusicBrainz.Artist | undefined>(undefined);
	readonly releaseGroups = signal<Array<ReleaseGroupGroup>>([]);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			this.refresh();
		});
	}

	refresh(): void {
		const mbArtistID = this.mbArtistID();
		if (!mbArtistID) {
			return;
		}
		this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.artist, mbID: mbArtistID })
			.then(data => {
				this.display((data.data as MusicBrainz.Response).artist);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	displayReleaseGroups(mbArtist: MusicBrainz.Artist): void {
		const groups: Array<ReleaseGroupGroup> = [];
		if (mbArtist.releaseGroups) {
			for (const r of mbArtist.releaseGroups) {
				const type = [r.primaryType, ...(r.secondaryTypes ?? [])].join(' / ');
				let typeGroup = groups.find(g => g.type === type);
				if (!typeGroup) {
					typeGroup = { groups: [], type };
					groups.push(typeGroup);
				}
				typeGroup.groups.push({ group: r });
			}
		}
		for (const g of groups) {
			g.groups.sort((a, b) =>
				(b.group.firstReleaseDate ?? '').localeCompare(a.group.firstReleaseDate ?? ''));
		}
		groups.sort((a, b) => a.type.localeCompare(b.type));
		this.releaseGroups.set(groups);
	}

	display(mbArtist?: MusicBrainz.Artist): void {
		if (!mbArtist) {
			this.mbArtist.set(undefined);
			this.releaseGroups.set([]);
			return;
		}
		this.mbArtist.set(mbArtist);
		this.displayReleaseGroups(mbArtist);
	}
}
