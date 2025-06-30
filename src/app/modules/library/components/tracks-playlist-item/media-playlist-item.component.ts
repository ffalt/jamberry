import {Component, Input, inject} from '@angular/core';
import {NavigService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';

@Component({
	selector: 'app-media-playlist-item',
	templateUrl: './media-playlist-item.component.html',
	styleUrls: ['./media-playlist-item.component.scss'],
	standalone: false
})
export class MediaPlaylistItemComponent {
	@Input() media?: Jam.MediaBase;
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
}
