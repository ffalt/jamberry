import {Component} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {JamLists} from '@app/utils/jam-lists';
import {NavigService} from '@core/services';
import {JamService} from '@jam';
import {ContextMenuPodcastsComponent} from '@library/components';
import {HeaderTab} from '@shared/components';

@Component({
	selector: 'app-page-podcasts',
	templateUrl: './podcasts-page.component.html',
	styleUrls: ['./podcasts-page.component.scss']
})
export class PodcastsPageComponent {
	tabs: Array<HeaderTab> = [
		{label: 'Index', link: {route: '/library/podcasts', exact: true}},
		...JamLists.filter(l => l.id !== 'random').map(list => (
			{label: list.text, link: {route: `/library/podcasts/${list.link}`}}
		))
	];

	constructor(public jam: JamService, public navig: NavigService, private contextMenuService: ContextMenuService) {
	}

	onContextMenu($event: MouseEvent, item?: any): void {
		this.contextMenuService.open(ContextMenuPodcastsComponent, item, $event);
	}
}
