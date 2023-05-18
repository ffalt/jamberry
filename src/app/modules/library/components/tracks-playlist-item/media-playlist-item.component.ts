import {Component, Input} from '@angular/core';
import {NavigService, PlayerService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-playlist-item',
	templateUrl: './media-playlist-item.component.html',
	styleUrls: ['./media-playlist-item.component.scss']
})
export class MediaPlaylistItemComponent {
	@Input() media?: Jam.MediaBase;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;
	constructor(public player: PlayerService, public navig: NavigService, public actions: ActionsService) {
	}

}
