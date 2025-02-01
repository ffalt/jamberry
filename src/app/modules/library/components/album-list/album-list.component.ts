import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {JamAlbumObject} from '@library/model/objects';
import {ActionsService, PodcastService} from '@shared/services';
import {LibraryService} from '../../services';

@Component({
    selector: 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.scss'],
    standalone: false
})
export class AlbumListComponent {
	@Input() albums?: Array<Jam.Album>;
	@Input() showArtist: boolean = false;

	constructor(
		private library: LibraryService,
		public jam: JamService, public player: PlayerService, public podcastService: PodcastService,
		public actions: ActionsService, public navig: NavigService
	) {
	}

	onContextMenu($event: Event, item: Jam.Album): void {
		this.library.openJamObjectMenu(new JamAlbumObject(item, this.library), $event);
	}

	play(episode: Jam.Episode): void {
		if (episode.status === PodcastStatus.completed) {
			this.player.startEpisode(episode);
		} else if (episode.status !== PodcastStatus.downloading && this.jam.auth.user?.roles?.podcast) {
			this.podcastService.retrieveEpisode(episode);
		}
	}

}
