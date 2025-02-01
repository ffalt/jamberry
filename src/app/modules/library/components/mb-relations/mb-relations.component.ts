import {Component, Input, OnChanges} from '@angular/core';
import {MusicBrainz} from '@jam';

export interface RelationType {
	type: string;
	relations: Array<MusicBrainz.Relation>;
}

export interface RelationGroup {
	targetType: string;
	types: Array<RelationType>;
}

@Component({
    selector: 'app-mb-relations',
    templateUrl: './mb-relations.component.html',
    styleUrls: ['./mb-relations.component.scss'],
    standalone: false
})
export class MbRelationsComponent implements OnChanges {
	@Input() relations?: Array<MusicBrainz.Relation>;
	urlRelationGroup?: RelationGroup;

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		if (this.relations) {
			this.displayRelationGroups(this.relations);
		}
	}

	displayRelationGroups(relations: Array<MusicBrainz.Relation>): void {
		this.urlRelationGroup = undefined;
		const relTypes: { [name: string]: { [type: string]: Array<MusicBrainz.Relation> } } = {};
		(relations || []).forEach(rel => {
			relTypes[rel.targetType] = relTypes[rel.targetType] || {};
			relTypes[rel.targetType][rel.type] = relTypes[rel.targetType][rel.type] || [];
			relTypes[rel.targetType][rel.type].push(rel);
		});
		const relationGroups = Object.keys(relTypes).map(key =>
			({
				targetType: key,
				types: Object.keys(relTypes[key]).map(k => ({type: k, relations: relTypes[key][k]}))
			}));
		this.urlRelationGroup = relationGroups.find(r => r.targetType === 'url');
	}
}
