import { Injectable } from '@angular/core';
import type { TabInterface, TabPortalOutlet } from '../../../modules/tab-portal';
import { TabInfoComponent } from '../components/tab-info/tab-info.component';
import { TabMainComponent } from '../components/tab-main/tab-main.component';
import { TabPlayerComponent } from '../components/tab-player/tab-player.component';
import { TabQueueComponent } from '../components/tab-queue/tab-queue.component';

@Injectable({ providedIn: 'root' })
export class MainTabsService {
	infoTab: TabInterface = { name: 'info-queue', componentClass: TabInfoComponent };
	playerTab: TabInterface = { name: 'player', componentClass: TabPlayerComponent };
	queueTab: TabInterface = { name: 'queue', componentClass: TabQueueComponent };
	mainTab: TabInterface = { name: 'main', componentClass: TabMainComponent };
	tabs = [this.mainTab, this.playerTab, this.queueTab, this.infoTab];
	private tabPortalHost?: TabPortalOutlet;

	get currentTabName(): Readonly<string | undefined> {
		return this.tabPortalHost ? this.tabPortalHost.currentTabName : undefined;
	}

	init(tabPortalHost: TabPortalOutlet): void {
		this.tabPortalHost = tabPortalHost;
		this.switchToMain();
	}

	switchToMain(): void {
		this.switchTo(this.mainTab.name);
	}

	dispose(): void {
		if (this.tabPortalHost) {
			this.tabPortalHost.dispose();
			this.tabPortalHost = undefined;
		}
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
