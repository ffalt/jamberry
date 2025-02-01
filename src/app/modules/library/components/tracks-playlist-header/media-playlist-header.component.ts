import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-media-playlist-header',
    templateUrl: './media-playlist-header.component.html',
    styleUrls: ['./media-playlist-header.component.scss'],
    standalone: false
})
export class MediaPlaylistHeaderComponent {
	@Input() showArtist: boolean = false;
	@Input() showRating: boolean = false;
	@Input() showPlayCount: boolean = false;
	@Input() showPlayDate: boolean = false;
}
