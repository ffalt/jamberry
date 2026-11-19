import { Service, signal } from '@angular/core';
import type { TabInterface, TabPortalOutlet } from '../../../modules/tab-portal';
import { TabMainComponent } from '../components/tab-main/tab-main.component';
import { TabQueueComponent } from '../components/tab-queue/tab-queue.component';

@Service()
export class MainTabsService {
	queueTab: TabInterface = { name: 'queue', componentClass: TabQueueComponent, active: signal(false) };
	mainTab: TabInterface = { name: 'main', componentClass: TabMainComponent, active: signal(false) };
	tabs = [this.mainTab, this.queueTab];
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
		if (!this.tabPortalHost) {
			return;
		}

		this.tabPortalHost.dispose();
		this.tabPortalHost = undefined;
	}

	clickQueue(): void {
		this.switchTo((this.currentTabName === this.queueTab.name ? this.mainTab : this.queueTab).name);
	}

	switchTo(name: string): void {
		if (this.tabPortalHost) {
			this.tabPortalHost.switchTo(name);
		}
	}
}
