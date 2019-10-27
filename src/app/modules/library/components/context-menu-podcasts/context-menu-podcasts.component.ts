import {Component, ViewChild} from '@angular/core';
import {ContextMenuHostComponentInterface} from '@app/modules/context-menu';
import {ContextMenuComponent} from '@app/modules/context-menu/context-menu.component';
import {NavigService} from '@core/services';
import {JamService} from '@jam';
import {PodcastService} from '@shared/services';

@Component({
	selector: 'app-context-menu-podcasts',
	templateUrl: './context-menu-podcasts.component.html',
	styleUrls: ['./context-menu-podcasts.component.scss']
})
export class ContextMenuPodcastsComponent implements ContextMenuHostComponentInterface<any> {
	@ViewChild('podcastsMenu') contextMenu: ContextMenuComponent;
	canEditPodcasts: boolean = false;

	constructor(public podcastService: PodcastService, public jam: JamService, public navig: NavigService) {
		this.canEditPodcasts = this.jam.auth.user && this.jam.auth.user.roles && this.jam.auth.user.roles.podcast;
	}

	refreshPodcastFeeds(): void {
		this.podcastService.checkPodcasts();
	}

}
