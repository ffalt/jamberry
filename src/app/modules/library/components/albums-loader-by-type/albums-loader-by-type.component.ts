import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumTypeUrlNamesKeys, ListTypeUrlNamesKeys} from '@app/utils/jam-lists';
import {AlbumType, JamParameters} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-loader-page-by-type',
	templateUrl: './albums-loader-by-type.component.html',
	styleUrls: ['./albums-loader-by-type.component.scss']
})
export class AlbumsLoaderByTypeComponent implements OnInit, OnDestroy {
	albumType: AlbumType;
	listType: JamParameters.ListType;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				const type = val.length > 0 ? val[0].path : undefined;
				this.listType = ListTypeUrlNamesKeys[type];
			});
			this.route.parent.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				const type = val.length > 0 ? val[0].path : undefined;
				this.albumType = AlbumTypeUrlNamesKeys[type];
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
