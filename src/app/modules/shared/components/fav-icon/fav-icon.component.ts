import {Component, input} from '@angular/core';

@Component({
	selector: 'app-fav-icon',
	templateUrl: './fav-icon.component.html',
	styleUrls: ['./fav-icon.component.scss'],
	standalone: false
})
export class FavIconComponent {
	readonly faved = input<number>();
}
