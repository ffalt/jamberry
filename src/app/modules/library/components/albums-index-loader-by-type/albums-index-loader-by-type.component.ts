import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlAlbumType} from '@app/utils/jam-lists';

import {AlbumType} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-index-loader-by-type',
	templateUrl: './albums-index-loader-by-type.component.html',
	styleUrls: ['./albums-index-loader-by-type.component.scss']
})
export class AlbumsIndexLoaderByTypeComponent implements OnInit, OnDestroy {
	albumType: AlbumType;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.parent.url
				.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
				this.albumType = getUrlAlbumType(val);
			}, e => {
				console.error(e);
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
