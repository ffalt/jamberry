import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListTypeUrlNamesKeys} from '@app/utils/jam-lists';
import {AlbumType, JamParameters} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-artists-loader-page-by-type',
	templateUrl: './artists-loader-by-type.component.html',
	styleUrls: ['./artists-loader-by-type.component.scss']
})
export class ArtistsLoaderByTypeComponent implements OnInit, OnDestroy {
	listType: JamParameters.ListType;
	albumType: AlbumType = AlbumType.album;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.parent.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			this.albumType = type === 'artists' ? AlbumType.album : AlbumType.series;
		});
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			this.listType = ListTypeUrlNamesKeys[type];
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
