import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
    selector: 'app-context-entry-fav',
    templateUrl: './context-entry-fav.component.html',
    styleUrls: ['./context-entry-fav.component.scss'],
    standalone: false
})
export class ContextEntryFavComponent {
	@Input() base?: Jam.Base;
}
