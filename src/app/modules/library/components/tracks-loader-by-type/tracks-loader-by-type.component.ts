import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListTypeUrlNamesKeys} from '@app/utils/jam-lists';
import {ListType} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-tracks-loader-page-by-type',
	templateUrl: './tracks-loader-by-type.component.html',
	styleUrls: ['./tracks-loader-by-type.component.scss']
})
export class TracksLoaderByTypeComponent implements OnInit, OnDestroy {
	listType?: ListType;
	protected unsubscribe = new Subject<void>();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			this.listType = type ? ListTypeUrlNamesKeys[type] : undefined;
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
