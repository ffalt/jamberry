import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconartImageComponent } from '../iconart-image/iconart-image.component';
import { type HeaderTab, HeaderTabsComponent } from '../header-tabs/header-tabs.component';

@Component({
	selector: 'app-view-header-icon-section',
	templateUrl: './header-icon-section.component.html',
	styleUrls: ['./header-icon-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(contextmenu)': 'contextmenuEvent($event)'
	},
	imports: [IconartImageComponent, HeaderTabsComponent]
})
export class HeaderIconSectionComponent {
	readonly icon = input<string>();
	readonly section = input<string>();
	readonly sectionType = input<string>();
	readonly smallTabs = input<boolean>(false);
	readonly hasContextMenu = input<boolean>(false);
	readonly tabs = input<Array<HeaderTab> | undefined>([]);
	readonly contextMenuRequest = output<Event>();

	contextmenuEvent(event: Event): void {
		this.contextMenuRequest.emit(event);
	}
}
