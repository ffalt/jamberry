import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-playlists',
	templateUrl: 'playlists.component.html',
	styleUrls: ['playlists.component.scss']
})
export class PlaylistsComponent {
	@Input() playlists: Array<Jam.Playlist>;
}
