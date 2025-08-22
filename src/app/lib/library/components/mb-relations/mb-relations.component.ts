import { Component, input, type OnChanges } from '@angular/core';
import type { MusicBrainz } from '@jam';

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
	styleUrls: ['./mb-relations.component.scss']
})
export class MbRelationsComponent implements OnChanges {
	readonly relations = input<Array<MusicBrainz.Relation>>();
	urlRelationGroup?: RelationGroup;

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const relations = this.relations();
		if (relations) {
			this.displayRelationGroups(relations);
		}
	}

	displayRelationGroups(relations?: Array<MusicBrainz.Relation>): void {
		this.urlRelationGroup = undefined;
		const relTypes: { [name: string]: { [type: string]: Array<MusicBrainz.Relation> } } = {};
		for (const rel of (relations ?? [])) {
			relTypes[rel.targetType] = relTypes[rel.targetType] ?? {};
			relTypes[rel.targetType][rel.type] = relTypes[rel.targetType][rel.type] ?? [];
			relTypes[rel.targetType][rel.type].push(rel);
		}
		const relationGroups = Object.keys(relTypes).map(key =>
			({
				targetType: key,
				types: Object.keys(relTypes[key]).map(k => ({ type: k, relations: relTypes[key][k] }))
			}));
		this.urlRelationGroup = relationGroups.find(r => r.targetType === 'url');
	}
}
