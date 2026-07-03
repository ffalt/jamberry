import { NgComponentOutlet } from '@angular/common';
import { Component, input, type Type } from '@angular/core';

@Component({
	selector: 'app-iconart-image',
	templateUrl: './iconart-image.component.html',
	styleUrls: ['./iconart-image.component.scss'],
	imports: [NgComponentOutlet],
	host: { class: 'icon' }
})
export class IconartImageComponent {
	readonly icon = input<Type<unknown>>();
}
