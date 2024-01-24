import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface Tab {
	id: string;
	name: string;
}

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
	@Input() tabs?: Array<Tab>;
	@Input() current?: Tab;
	@Output() readonly tabChange = new EventEmitter<Tab>();

	setTab(tab: Tab): void {
		this.current = tab;
		this.tabChange.emit(tab);
	}
}
