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
		const relationLists = relations ?? [];
		for (const rel of relationLists) {
			relTypes[rel.targetType] ??= {};
			relTypes[rel.targetType][rel.type] ??= [];
			relTypes[rel.targetType][rel.type].push(rel);
		}
		const relationGroups = Object.entries(relTypes)
			.map(([targetType, typeMap]) =>
				({
					targetType,
					types: Object.entries(typeMap).map(([type, rels]) => ({ type, relations: rels }))
				}));
		this.urlRelationGroup = relationGroups.find(r => r.targetType === 'url');
	}
}
