import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {JamService, MusicBrainz, MusicBrainzLookupType} from '@jam';
//
// export interface RelationType {
// 	type: string;
// 	relations: Array<MusicBrainz.Relation>;
// }
//
// export interface RelationGroup {
// 	targetType: string;
// 	types: Array<RelationType>;
// }
//
// export interface ReleaseGroup {
// 	group: MusicBrainz.ReleaseGroupBase;
// 	album?: Jam.Album;
// }
//
export interface AlbumInfo {
	name: string;
	value: string;
}

export interface AlbumInfoGroup {
	infos: Array<AlbumInfo>;
	name: string;
}

@Component({
	selector: 'app-mb-album',
	templateUrl: './mb-album.component.html',
	styleUrls: ['./mb-album.component.scss']
})
export class MbAlbumComponent implements OnChanges {
	mbAlbum: MusicBrainz.Release;
	infoGroups: Array<AlbumInfoGroup> = [];
	@Input() mbAlbumID: string;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.refresh();
	}

	refresh(): void {
		if (this.mbAlbumID) {
			this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.release, id: this.mbAlbumID})
				.then(data => {
					this.display(data.release);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	// displayRelationGroups(mbArtist: MusicBrainz.Artist): void {
	// 	this.urlRelationGroup = undefined;
	// 	const relTypes: { [name: string]: { [type: string]: Array<MusicBrainz.Relation> } } = {};
	// 	(mbArtist.relations || []).forEach(rel => {
	// 		relTypes[rel.targetType] = relTypes[rel.targetType] || {};
	// 		relTypes[rel.targetType][rel.type] = relTypes[rel.targetType][rel.type] || [];
	// 		relTypes[rel.targetType][rel.type].push(rel);
	// 	});
	// 	const relationGroups = Object.keys(relTypes).map(key =>
	// 		({
	// 			targetType: key,
	// 			types: Object.keys(relTypes[key]).map(k => ({type: k, relations: relTypes[key][k]}))
	// 		}));
	// 	this.urlRelationGroup = relationGroups.find(r => r.targetType === 'url');
	// }
	//
	// displayReleaseGroups(mbArtist: MusicBrainz.Artist): void {
	// 	this.releaseGroups = [];
	// 	mbArtist.releaseGroups.forEach(r => {
	// 		const type = [r.primaryType, ...(r.secondaryTypes || [])].join(' / ');
	// 		let typeGroup = this.releaseGroups.find(g => g.type === type);
	// 		if (!typeGroup) {
	// 			typeGroup = {groups: [], type};
	// 			this.releaseGroups.push(typeGroup);
	// 		}
	// 		typeGroup.groups.push({group: r});
	// 	});
	// 	this.releaseGroups.forEach(g => {
	// 		g.groups.sort((a, b) => {
	// 			return b.group.firstReleaseDate.localeCompare(a.group.firstReleaseDate);
	// 		});
	// 	});
	// 	this.releaseGroups.sort((a, b) => a.type.localeCompare(b.type));
	// }

	display(mbAlbum: MusicBrainz.Release): void {
		this.mbAlbum = mbAlbum;

		this.infoGroups = [];
		this.infoGroups.push({
			name: 'Release information',
			infos: [
				{name: 'Title', value: mbAlbum.title},
				{name: 'Disambiguation', value: mbAlbum.disambiguation},
				{name: 'Date', value: mbAlbum.date},
				{name: 'Country', value: mbAlbum.country},
				{name: 'Tags', value: (mbAlbum.tags || []).map(tag => tag.name).join(' / ')},
				{name: 'Status', value: mbAlbum.status},
				{name: 'Packaging', value: mbAlbum.packaging},
				{name: 'Barcode', value: mbAlbum.barcode},
				{name: 'ASIN', value: mbAlbum.asin},
				{name: 'Data Quality', value: mbAlbum.quality},
			].filter(item => !!item.value)
		});
		if (mbAlbum.releaseGroup) {
			this.infoGroups.push({
				name: 'Release Group information',
				infos: [
					{name: 'Title', value: mbAlbum.releaseGroup.title},
					{name: 'Disambiguation', value: mbAlbum.releaseGroup.disambiguation},
					{name: 'First Release Date', value: mbAlbum.releaseGroup.firstReleaseDate},
					{name: 'Album Type', value: [mbAlbum.releaseGroup.primaryType, ...(mbAlbum.releaseGroup.secondaryTypes || [])].join(' / ')},
					{name: 'Tags', value: (mbAlbum.releaseGroup.tags || []).map(tag => tag.name).join(' / ')},
				].filter(item => !!item.value)
			});
		}

		// this.urlRelationGroup = undefined;
		// if (!mbArtist) {
		// 	return;
		// }
		// this.displayRelationGroups(mbArtist);
		// this.displayReleaseGroups(mbArtist);
	}
}
