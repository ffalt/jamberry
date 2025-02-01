import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {HeaderTab} from '@shared/components';

@Component({
    selector: 'app-view-header-icon-section',
    templateUrl: './header-icon-section.component.html',
    styleUrls: ['./header-icon-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderIconSectionComponent {
	@Input() icon?: string;
	@Input() section?: string;
	@Input() sectionType?: string;
	@Input() smallTabs: boolean = false;
	@Input() hasContextMenu: boolean = false;
	@Input() tabs?: Array<HeaderTab> = [];
	@Output() readonly contextMenuRequest = new EventEmitter<Event>();

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: Event): void {
		this.contextMenuRequest.emit(event);
	}
}
