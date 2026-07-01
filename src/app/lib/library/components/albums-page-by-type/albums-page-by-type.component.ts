import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
export class AlbumsPageByTypeComponent {
	readonly typeInfo = signal<JamType | undefined>(undefined);

	readonly tabs = computed<Array<HeaderTab> | undefined>(() => {
		const t = this.typeInfo();
		return t ? this.library.buildTabs(t.id) : undefined;
	});

	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);
	private readonly library = inject(LibraryService);

	constructor() {
		this.route.url
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(value => {
				this.typeInfo.set(getUrlType(value));
			});
	}
}
