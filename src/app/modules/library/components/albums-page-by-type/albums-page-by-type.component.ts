import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, JamType} from '@app/utils/jam-lists';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-page-by-type',
	templateUrl: './albums-page-by-type.component.html',
	styleUrls: ['./albums-page-by-type.component.scss'],
	standalone: false
})
export class AlbumsPageByTypeComponent implements OnInit, OnDestroy {
	typeInfo?: JamType;
	tabs?: Array<HeaderTab>;
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			this.typeInfo = getUrlType(val);
			this.tabs = this.typeInfo ? this.library.buildTabs(this.typeInfo.id) : undefined;
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
