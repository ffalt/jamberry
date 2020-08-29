import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {ActionsService, PodcastService} from '@shared/services';
import {LibraryService} from '../../services';
import {ContextMenuObjComponent} from '../context-menu-obj/context-menu-obj.component';

@Component({
	selector: 'app-album-list',
	templateUrl: './album-list.component.html',
	styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {
	@Input() albums?: Array<Jam.Album>;
	@Input() showArtist: boolean = false;

	constructor(
		private library: LibraryService,
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent, item: Jam.Album): void {
		this.contextMenuService.open(ContextMenuObjComponent, new JamAlbumObject(item, this.library), $event);
	}

	play(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.player.startEpisode(episode);
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.user?.roles.podcast) {
			this.podcastService.retrieveEpisode(episode);
		}
	}

}
