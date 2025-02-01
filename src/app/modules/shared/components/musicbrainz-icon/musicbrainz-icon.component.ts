import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-mb-icon',
    templateUrl: './musicbrainz-icon.component.html',
    styleUrls: ['./musicbrainz-icon.component.scss'],
    standalone: false
})
export class MusicbrainzIconComponent {
	@Input() size: number = 16;
}
