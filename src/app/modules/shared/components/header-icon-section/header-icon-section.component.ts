import {ChangeDetectionStrategy, Component, HostListener, output, input} from '@angular/core';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-view-header-icon-section',
	templateUrl: './header-icon-section.component.html',
	styleUrls: ['./header-icon-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class HeaderIconSectionComponent {
	readonly icon = input<string>();
	readonly section = input<string>();
	readonly sectionType = input<string>();
	readonly smallTabs = input<boolean>(false);
	readonly hasContextMenu = input<boolean>(false);
	readonly tabs = input<Array<HeaderTab> | undefined>([]);
	readonly contextMenuRequest = output<Event>();

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: Event): void {
		this.contextMenuRequest.emit(event);
	}
}
