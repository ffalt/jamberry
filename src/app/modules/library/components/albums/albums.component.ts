import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-albums',
	templateUrl: './albums.component.html',
	styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnChanges {
	@Input() albums: Array<Jam.Album>;
	@Input() showArtist: boolean = false;
	@Input() viewTypeList: boolean = false;
	@Input() grouping: boolean = true;
	@Input() limitArtist: Jam.Artist;
	@Input() typeName: string;
	@Input() headline: string;
	groups: Array<{ type: string; albums: Array<Jam.Album>; }>;

	ngOnChanges(changes: SimpleChanges): void {
		this.groups = undefined;
		if (this.albums) {
			if (!this.grouping) {
				if (this.albums.length > 0) {
					this.groups = [{type: undefined, albums: this.albums}];
				}
				return;
			}
			const groups = [];
			for (const album of this.albums) {
				let group = groups.find(g => g.type === album.albumType);
				if (!group) {
					group = {type: album.albumType, albums: []};
					groups.push(group);
				}
				group.albums.push(album);
			}
			if (groups.length > 0) {
				this.groups = groups;
			}
		}
	}

}
