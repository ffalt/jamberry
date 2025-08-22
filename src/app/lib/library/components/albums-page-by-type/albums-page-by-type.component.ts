import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { getUrlType, type JamType } from '@utils/jam-lists';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { LibraryService } from '../../services/library/library.service';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { DeferLoadScrollHostDirective } from '@modules/defer-load/defer-load-scroll-host.directive';

@Component({
	selector: 'app-albums-page-by-type',
	templateUrl: './albums-page-by-type.component.html',
	styleUrls: ['./albums-page-by-type.component.scss'],
	imports: [RouterModule, HeaderIconSectionComponent, DeferLoadScrollHostDirective]
})
export class AlbumsPageByTypeComponent implements OnInit, OnDestroy {
	typeInfo?: JamType;
	tabs?: Array<HeaderTab>;
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(value => {
				this.typeInfo = getUrlType(value);
				this.tabs = this.typeInfo ? this.library.buildTabs(this.typeInfo.id) : undefined;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
