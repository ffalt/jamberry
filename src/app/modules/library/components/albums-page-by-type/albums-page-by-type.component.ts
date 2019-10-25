import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumTypeUrlNamesKeys, JamAlbumType, JamAlbumTypes, JamLists} from '@app/utils/jam-lists';
import {AlbumType} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-page-by-type',
	templateUrl: './albums-page-by-type.component.html',
	styleUrls: ['./albums-page-by-type.component.scss']
})
export class AlbumsPageByTypeComponent implements OnInit, OnDestroy {
	albumType: AlbumType;
	typeInfo: JamAlbumType;
	JamLists = JamLists;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			this.albumType = AlbumTypeUrlNamesKeys[type];
			this.typeInfo = JamAlbumTypes.find(t => t.id === this.albumType);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
