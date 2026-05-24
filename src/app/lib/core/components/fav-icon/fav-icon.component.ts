import { Component, input } from '@angular/core';
import { StringTogglePipe } from '../../pipes/string-toggle/string-toggle.pipe';

@Component({
	selector: 'app-fav-icon',
	templateUrl: './fav-icon.component.html',
	imports: [StringTogglePipe]
})
export class FavIconComponent {
	readonly faved = input<number>();
}
