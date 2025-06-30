import {Component, Input, inject} from '@angular/core';
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
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	private readonly jam = inject(JamService);
	private readonly player = inject(PlayerService);
	private readonly podcastService = inject(PodcastService);
	private readonly library = inject(LibraryService);

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
