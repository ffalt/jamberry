import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-fav-icon',
	templateUrl: 'fav-icon.component.html',
	styleUrls: ['fav-icon.component.scss']
})
export class FavIconComponent {
	@Input() state: Jam.State;
}
