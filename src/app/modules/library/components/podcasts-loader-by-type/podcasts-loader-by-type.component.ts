import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListTypeUrlNamesKeys} from '@app/utils/jam-lists';
import {JamParameters} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-podcasts-loader-page-by-type',
	templateUrl: './podcasts-loader-by-type.component.html',
	styleUrls: ['./podcasts-loader-by-type.component.scss']
})
export class PodcastsLoaderByTypeComponent implements OnInit, OnDestroy {
	listType: JamParameters.ListType;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
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
