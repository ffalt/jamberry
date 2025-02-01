import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

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
    standalone: false
})
export class HeaderTabsComponent {
	@Input() smallTabs: boolean = false;
	@Input() tabs?: Array<HeaderTab>;
}
