import {Component, input} from '@angular/core';

@Component({
	selector: 'app-media-playlist-header',
	templateUrl: './media-playlist-header.component.html',
	styleUrls: ['./media-playlist-header.component.scss'],
	standalone: false
})
export class MediaPlaylistHeaderComponent {
	readonly showArtist = input<boolean>(false);
	readonly showRating = input<boolean>(false);
	readonly showPlayCount = input<boolean>(false);
	readonly showPlayDate = input<boolean>(false);
}
