import {Injectable} from '@angular/core';
import {TabInterface, TabPortalOutlet} from '@app/modules/tab-portal';
import {TabInfoComponent, TabMainComponent, TabPlayerComponent, TabQueueComponent} from '../components';

@Injectable()
export class MainTabsService {
	infoTab: TabInterface = {name: 'info-queue', componentClass: TabInfoComponent};
	playerTab: TabInterface = {name: 'player', componentClass: TabPlayerComponent};
	queueTab: TabInterface = {name: 'queue', componentClass: TabQueueComponent};
	mainTab: TabInterface = {name: 'main', componentClass: TabMainComponent};
	tabs = [this.mainTab, this.playerTab, this.queueTab, this.infoTab];
	private tabPortalHost: TabPortalOutlet;

	get currentTabName(): Readonly<string | undefined> {
		return this.tabPortalHost ? this.tabPortalHost.currentTabName : undefined;
	}

	init(tabPortalHost: any): void {
		this.tabPortalHost = tabPortalHost;
		this.switchToMain();
	}

	switchToMain(): void {
		this.switchTo(this.mainTab.name);
	}

	dispose(): void {
		this.tabPortalHost.dispose();
		this.tabPortalHost = undefined;
	}

	clickInfo(): void {
		this.switchTo(this.currentTabName === this.infoTab.name ? this.mainTab.name : this.infoTab.name);
	}

	clickPlayer(): void {
		this.switchTo(this.currentTabName === this.playerTab.name ? this.mainTab.name : this.playerTab.name);
	}

	clickQueue(): void {
		this.switchTo(this.currentTabName === this.queueTab.name ? this.mainTab.name : this.queueTab.name);
	}

	switchTo(name: string): void {
		if (this.tabPortalHost) {
			this.tabPortalHost.switchTo(name);
		}
	}
}
