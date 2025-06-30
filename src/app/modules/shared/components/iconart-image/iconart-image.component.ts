import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
	selector: 'app-iconart-image',
	templateUrl: './iconart-image.component.html',
	styleUrls: ['./iconart-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class IconartImageComponent {
	readonly icon = input<string>();
}
