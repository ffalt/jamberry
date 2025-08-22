import { Component, inject, input } from '@angular/core';
import type { JamObjectType } from '@jam';
import type { IndexEntry, IndexGroup } from '@core/services/index/index.service';
import { IndexEntryCardComponent } from '../index-entry-card/index-entry-card.component';
import { DeferLoadDirective } from '@modules/defer-load/defer-load.directive';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { AppService } from '@core/services/app/app.service';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-index-group',
	templateUrl: './index-group.component.html',
	styleUrls: ['./index-group.component.scss'],
	imports: [IndexEntryCardComponent, DeferLoadDirective, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective]
})
export class IndexGroupComponent {
	readonly indexType = input<JamObjectType>();
	readonly group = input<IndexGroup>();
	readonly app = inject(AppService);
	visible: boolean = false;
	private readonly navig = inject(NavigService);

	gotInView(): void {
		this.visible = true;
	}

	navigTo(entry: IndexEntry): void {
		this.navig.navigate([entry.link, { name: entry.name }]);
	}
}
