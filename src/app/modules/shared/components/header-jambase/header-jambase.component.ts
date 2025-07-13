import {ChangeDetectionStrategy, Component, output, input} from '@angular/core';
import type {Jam} from '@jam';
import type {HeaderTab} from '@shared/components';

export interface HeaderInfo {
	label: string;
	value: string | number;

	click?(): void;
}

@Component({
	selector: 'app-view-header-jam-base',
	templateUrl: './header-jambase.component.html',
	styleUrls: ['./header-jambase.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	host: {
		'(contextmenu)': 'contextmenuEvent($event)'
	}
})
export class HeaderJamBaseComponent {
	readonly base = input<Jam.Base>();
	readonly section = input<string>();
	readonly sectionType = input<string>();
	readonly hasContextMenu = input<boolean>(false);
	readonly tabs = input<Array<HeaderTab>>();
	readonly infos = input<Array<HeaderInfo>>([]);
	readonly contextMenuRequest = output<Event>();
	readonly playRequest = output<Event>();

	contextmenuEvent(event: Event): void {
		this.contextMenuRequest.emit(event);
	}

	clickItem(item: HeaderInfo): void {
		if (item.click) {
			item.click();
		}
	}
}
