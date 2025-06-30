import {Component, input} from '@angular/core';

@Component({
	selector: 'app-expand-collapse-icon',
	templateUrl: './expand-collapse-icon.component.html',
	styleUrls: ['./expand-collapse-icon.component.scss'],
	standalone: false
})
export class ExpandCollapseIconComponent {
	readonly expanded = input<boolean>(false);
}
