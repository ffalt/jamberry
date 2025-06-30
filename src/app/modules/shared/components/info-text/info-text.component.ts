import {Component, input} from '@angular/core';

@Component({
	selector: 'app-info-text',
	templateUrl: './info-text.component.html',
	styleUrls: ['./info-text.component.scss'],
	standalone: false
})
export class InfoTextComponent {
	readonly info = input<string>();
}
