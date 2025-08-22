import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FocusKeyListDirective } from '../../directives/focus-key-list.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FocusKeyListItemDirective } from '../../directives/focus-key-list-item.directive';

export interface HeaderTab {
	label: string;
	link?: {
		route: string;
		exact?: boolean;
	};
	active?: boolean;

	click(): void;
}

@Component({
	selector: 'app-view-header-tabs',
	templateUrl: './header-tabs.component.html',
	styleUrls: ['./header-tabs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLinkActive, FocusKeyListItemDirective, RouterLink, FocusKeyListDirective]
})
export class HeaderTabsComponent {
	readonly smallTabs = input<boolean>(false);
	readonly tabs = input<Array<HeaderTab>>();
}
