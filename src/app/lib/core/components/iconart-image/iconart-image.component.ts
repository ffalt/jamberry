import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, type Type } from '@angular/core';

@Component({
	selector: 'app-iconart-image',
	templateUrl: './iconart-image.component.html',
	styleUrls: ['./iconart-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgComponentOutlet],
	host: { class: 'icon' }
})
export class IconartImageComponent {
	readonly icon = input<Type<unknown>>();
}
