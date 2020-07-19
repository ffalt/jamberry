import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-fav-icon',
	templateUrl: './fav-icon.component.html',
	styleUrls: ['./fav-icon.component.scss']
})
export class FavIconComponent {
	@Input() faved: number | undefined;
}
