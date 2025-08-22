import { Component, inject, input, type OnChanges } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService, type MusicBrainz, MusicBrainzLookupType } from '@jam';
import { MbRelationsComponent } from '../mb-relations/mb-relations.component';
import { MbArtistCreditsPipe } from '@core/pipes/mb-artist-credits.pipe';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { MusicbrainzIconComponent } from '@core/components/musicbrainz-icon/musicbrainz-icon.component';

export interface MBAlbumInfo {
	name: string;
	value: string;
}

export interface MBAlbumInfoGroup {
	infos: Array<MBAlbumInfo>;
	name: string;
}

@Component({
	selector: 'app-mb-album',
	templateUrl: './mb-album.component.html',
	styleUrls: ['./mb-album.component.scss'],
	imports: [MbRelationsComponent, MbArtistCreditsPipe, MediadurationPipe, MusicbrainzIconComponent]
})
export class MbAlbumComponent implements OnChanges {
	readonly mbAlbumID = input<string>();
	mbAlbum?: MusicBrainz.Release;
	infoGroups: Array<MBAlbumInfoGroup> = [];
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const mbAlbumID = this.mbAlbumID();
		if (mbAlbumID) {
			this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.release, mbID: mbAlbumID })
				.then(res => {
					const data = res.data as MusicBrainz.Response;
					this.display(data.release!);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	display(mbAlbum: MusicBrainz.Release): void {
		this.mbAlbum = mbAlbum;
		let tags = mbAlbum.tags ?? [];
		if (tags.length === 0) {
			tags = mbAlbum.releaseGroup.tags ?? [];
		}
		const group: MBAlbumInfoGroup = {
			name: 'Release information',
			infos: [
				{ name: 'Title', value: mbAlbum.title },
				{ name: 'Artist', value: this.compactArtist(mbAlbum.artistCredit) },
				{ name: 'Disambiguation', value: mbAlbum.disambiguation },
				{ name: 'Date', value: mbAlbum.date },
				{ name: 'First Release Date', value: mbAlbum.releaseGroup.firstReleaseDate },
				{ name: 'Country', value: mbAlbum.country },
				{ name: 'Tags', value: tags.map(tag => tag.name).join(' / ') },
				{ name: 'Album Type', value: [mbAlbum.releaseGroup.primaryType, ...(mbAlbum.releaseGroup.secondaryTypes ?? [])].join(' / ') },
				{ name: 'Status', value: mbAlbum.status },
				{ name: 'Packaging', value: mbAlbum.packaging },
				{ name: 'Release ID', value: mbAlbum.id },
				{ name: 'Release Group ID', value: mbAlbum.releaseGroup.id },
				{ name: 'Barcode', value: mbAlbum.barcode },
				{ name: 'ASIN', value: mbAlbum.asin },
				{ name: 'Data Quality', value: mbAlbum.quality }
			].filter(item => !!item.value) as Array<MBAlbumInfo>
		};
		this.infoGroups = [group];
	}

	compactArtist(artistCredit?: Array<MusicBrainz.ArtistCredit>): string {
		if (!artistCredit?.length) {
			return '';
		}
		return artistCredit.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}
}
