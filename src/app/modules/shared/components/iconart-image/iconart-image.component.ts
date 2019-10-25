import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-iconart-image',
	templateUrl: './iconart-image.component.html',
	styleUrls: ['./iconart-image.component.scss']
})
export class IconartImageComponent {
	@Input() icon: string;
}
