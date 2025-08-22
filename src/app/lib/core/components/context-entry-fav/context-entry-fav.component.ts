import { Component, input } from '@angular/core';
import type { Jam } from '@jam';
import { FavIconComponent } from '../fav-icon/fav-icon.component';

@Component({
	selector: 'app-context-entry-fav',
	templateUrl: './context-entry-fav.component.html',
	styleUrls: ['./context-entry-fav.component.scss'],
	imports: [FavIconComponent]
})
export class ContextEntryFavComponent {
	readonly base = input<Jam.Base>();
}
