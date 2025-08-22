import { Component, input, model, output } from '@angular/core';

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
	readonly tabs = input<Array<Tab>>();
	readonly current = model<Tab>();
	readonly tabChange = output<Tab>();

	setTab(tab: Tab): void {
		this.current.set(tab);
		this.tabChange.emit(tab);
	}
}
