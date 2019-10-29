import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
	@Input() typeName: string;
	@Input() artists: Array<Jam.Artist>;
	@Input() viewTypeList: boolean = false;
}
