import { Component, input, model } from '@angular/core';

@Component({
	selector: 'app-view-type-toggle',
	templateUrl: './view-type-toggle.component.html',
	styleUrls: ['./view-type-toggle.component.scss']
})
export class ViewTypeToggleComponent {
	readonly viewTypeList = model<boolean>(false);
	readonly headline = input<string>();
}
