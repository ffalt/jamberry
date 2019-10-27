import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Jam} from '@jam';
import {HeaderTab} from '@shared/components';

export interface HeaderInfo {
	label: string;
	value: string | number;

	click?(): void;
}

@Component({
	selector: 'app-view-header-jam-base',
	templateUrl: './header-jambase.component.html',
	styleUrls: ['./header-jambase.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderJamBaseComponent {
	@Input() base: Jam.Base;
	@Input() section: string;
	@Input() sectionType: string;
	@Input() hasContextMenu: boolean = false;
	@Input() tabs: Array<HeaderTab>;
	@Input() infos: Array<HeaderInfo> = [];
	@Output() readonly contextMenuRequest = new EventEmitter<MouseEvent>();
	@Output() readonly playRequest = new EventEmitter<MouseEvent>();

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: MouseEvent): void {
		this.contextMenuRequest.emit(event);
	}

	playEvent(event: MouseEvent): void {
		this.contextMenuRequest.emit(event);
	}

	clickItem(item: HeaderInfo):void {
		if (item.click) {
			item.click();
		}
	}
}
