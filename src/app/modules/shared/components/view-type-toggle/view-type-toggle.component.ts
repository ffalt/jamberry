import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-view-type-toggle',
	templateUrl: './view-type-toggle.component.html',
	styleUrls: ['./view-type-toggle.component.scss']
})
export class ViewTypeToggleComponent {
	@Input() viewTypeList: boolean = false;
	@Input() headline?: string;
}
