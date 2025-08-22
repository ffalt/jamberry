import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ListType } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { ListTypeUrlNamesKeys } from '@utils/jam-lists';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';

@Component({
	selector: 'app-tracks-loader-page-by-type',
	templateUrl: './tracks-loader-by-type.component.html',
	styleUrls: ['./tracks-loader-by-type.component.scss'],
	imports: [TracksLoaderComponent]
})
export class TracksLoaderByTypeComponent implements OnInit, OnDestroy {
	listType?: ListType;
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(value => {
				const type = value.length > 0 ? value[0].path : undefined;
				this.listType = type ? ListTypeUrlNamesKeys[type] : undefined;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
