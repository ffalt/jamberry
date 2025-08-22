import { Component, inject, input } from '@angular/core';
import type { Index, IndexEntry } from '@core/services/index/index.service';
import { IndexGroupComponent } from '../index-group/index-group.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { ViewTypeToggleComponent } from '@core/components/view-type-toggle/view-type-toggle.component';
import { AppService } from '@core/services/app/app.service';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	imports: [IndexGroupComponent, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective, BackgroundTextListComponent, LoadingComponent, ViewTypeToggleComponent]
})
export class IndexComponent {
	readonly index = input<Index>();
	readonly viewTypeList = input<boolean>(false);
	readonly app = inject(AppService);
	private readonly navig = inject(NavigService);

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, { name: entry.name }]);
	}

	navigToExtra(entry: IndexEntry): void {
		if (entry.extraLink) {
			this.navig.navigate([entry.extraLink, { name: entry.name }]);
		}
	}
}
