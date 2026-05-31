import { Component, input } from '@angular/core';

@Component({
	selector: 'app-discogs-icon',
	templateUrl: './discogs-icon.component.html',
	styleUrls: ['./discogs-icon.component.scss']
})
export class DiscogsIconComponent {
	readonly size = input<number>(16);
}
