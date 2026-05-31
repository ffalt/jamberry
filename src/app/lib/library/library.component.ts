import { Component, ElementRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { SidebarLibraryComponent } from './components/sidebar/sidebar-library.component';
import { DeferLoadService } from '@modules/defer-load/defer-load.service';
import { SplitterComponent } from '@core/components/splitter/splitter.component';
import { LibraryService } from './services/library/library.service';
import { IndexService } from '@core/services/index/index.service';
import { AppService } from '@core/services/app/app.service';
import { SettingsStoreService } from '@core/services/settings-store/settings-store.service';
import { IconLeftOpenMiniComponent } from '@core/components/icons/icon-left-open-mini.component';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	host: {
		'(scroll)': 'scrollTrack()'
	},
	imports: [IconLeftOpenMiniComponent, RouterModule, SidebarLibraryComponent, SidebarRightComponent, SplitterComponent],
	providers: [LibraryService, IndexService]
})

export class LibraryComponent {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly deferLoadService = inject(DeferLoadService);
	private readonly app = inject(AppService);
	private readonly settingsStore = inject(SettingsStoreService);

	get showSidebarRight(): boolean {
		return this.app.settings.showSidebarRight;
	}

	toggleSidebarRight(): void {
		this.app.settings.showSidebarRight = !this.showSidebarRight;
		this.settingsStore.saveSettings();
	}

	scrollTrack(): void {
		this.deferLoadService.notifyScroll({ name: 'library', element: this.element.nativeElement });
	}
}
