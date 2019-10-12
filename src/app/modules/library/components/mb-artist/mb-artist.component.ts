import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamService, MusicBrainz, MusicBrainzLookupType} from '@jam';

export interface RelationType {
	type: string;
	relations: Array<MusicBrainz.Relation>;
}

export interface RelationGroup {
	targetType: string;
	types: Array<RelationType>;
}

export interface ReleaseGroup {
	group: MusicBrainz.ReleaseGroupBase;
	album?: Jam.Album;
}

@Component({
	selector: 'app-mb-artist',
	templateUrl: 'mb-artist.component.html',
	styleUrls: ['mb-artist.component.scss']
})
export class MbArtistComponent implements OnChanges {
	mbArtist: MusicBrainz.Artist;
	releaseGroups: Array<ReleaseGroup> = [];
	relationGroups: Array<RelationGroup> = [];
	urlRelationGroup: RelationGroup;
	@Input() mbArtistID: string;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.refresh();
	}

	refresh(): void {
		if (this.mbArtistID) {
			this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.artist, id: this.mbArtistID})
				.then(data => {
					this.display(data.artist);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	display(mbArtist: MusicBrainz.Artist): void {
		this.mbArtist = mbArtist;
		this.relationGroups = [];
		this.relationGroups = [];
		this.urlRelationGroup = undefined;
		if (!mbArtist) {
			return;
		}
		this.releaseGroups = this.mbArtist.releaseGroups
			.sort((a, b) => {
				const result = a.primaryType.localeCompare(b.primaryType);
				if (result !== 0) {
					return result;
				}
				return b.firstReleaseDate.localeCompare(a.firstReleaseDate);
			})
			.map(group => ({group}));

		const relTypes: { [name: string]: { [type: string]: Array<MusicBrainz.Relation> } } = {};
		(mbArtist.relations || []).forEach(rel => {
			relTypes[rel.targetType] = relTypes[rel.targetType] || {};
			relTypes[rel.targetType][rel.type] = relTypes[rel.targetType][rel.type] || [];
			relTypes[rel.targetType][rel.type].push(rel);
		});
		this.relationGroups = Object.keys(relTypes).map(key =>
			({
				targetType: key,
				types: Object.keys(relTypes[key]).map(k => ({type: k, relations: relTypes[key][k]}))
			}));
		this.urlRelationGroup = this.relationGroups.find(r => r.targetType === 'url');
	}
}
