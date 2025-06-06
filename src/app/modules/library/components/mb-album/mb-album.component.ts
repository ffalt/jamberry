import {Component, Input, OnChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {JamService, MusicBrainz, MusicBrainzLookupType} from '@jam';

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
    standalone: false
})
export class MbAlbumComponent implements OnChanges {
	@Input() mbAlbumID?: string;
	mbAlbum?: MusicBrainz.Release;
	infoGroups: Array<MBAlbumInfoGroup> = [];

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		if (this.mbAlbumID) {
			this.jam.metadata.musicbrainzLookup({type: MusicBrainzLookupType.release, mbID: this.mbAlbumID})
				.then(data => {
					this.display(data.data.release);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	display(mbAlbum: MusicBrainz.Release): void {
		this.mbAlbum = mbAlbum;
		let tags = mbAlbum.tags || [];
		if (tags.length === 0) {
			tags = mbAlbum.releaseGroup.tags || [];
		}
		const group: MBAlbumInfoGroup = {
			name: 'Release information',
			infos: [
				{name: 'Title', value: mbAlbum.title},
				{name: 'Artist', value: this.compactArtist(mbAlbum.artistCredit)},
				{name: 'Disambiguation', value: mbAlbum.disambiguation},
				{name: 'Date', value: mbAlbum.date},
				{name: 'First Release Date', value: mbAlbum.releaseGroup.firstReleaseDate},
				{name: 'Country', value: mbAlbum.country},
				{name: 'Tags', value: tags.map(tag => tag.name).join(' / ')},
				{name: 'Album Type', value: [mbAlbum.releaseGroup.primaryType, ...(mbAlbum.releaseGroup.secondaryTypes || [])].join(' / ')},
				{name: 'Status', value: mbAlbum.status},
				{name: 'Packaging', value: mbAlbum.packaging},
				{name: 'Release ID', value: mbAlbum.id},
				{name: 'Release Group ID', value: mbAlbum.releaseGroup.id},
				{name: 'Barcode', value: mbAlbum.barcode},
				{name: 'ASIN', value: mbAlbum.asin},
				{name: 'Data Quality', value: mbAlbum.quality}
			].filter(item => !!item.value) as Array<MBAlbumInfo>
		};
		this.infoGroups = [group];
	}

	compactArtist(artistCredit: Array<MusicBrainz.ArtistCredit>): string {
		// TODO: extract to a pipe
		if (!artistCredit || artistCredit.length === 0) {
			return '';
		}
		return artistCredit.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}
}
