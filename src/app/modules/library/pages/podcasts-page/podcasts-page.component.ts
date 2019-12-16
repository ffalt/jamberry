import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService} from '@core/services';
import {JamService} from '@jam';
import {ContextMenuPodcastsComponent} from '@library/components';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-podcasts',
	templateUrl: './podcasts-page.component.html',
	styleUrls: ['./podcasts-page.component.scss']
})
export class PodcastsPageComponent {
	tabs: Array<HeaderTab>;

	constructor(public jam: JamService, public navig: NavigService,
							private contextMenuService: ContextMenuService, private library: LibraryService) {
		this.tabs = this.library.buildTabs('podcasts');
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open(ContextMenuPodcastsComponent, item, $event);
	}
}
