import { Component, input } from '@angular/core';

@Component({
	selector: 'app-mb-icon',
	templateUrl: './musicbrainz-icon.component.html',
	styleUrls: ['./musicbrainz-icon.component.scss']
})
export class MusicbrainzIconComponent {
	readonly size = input<number>(16);
}
