import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-expand-collapse-icon',
    templateUrl: './expand-collapse-icon.component.html',
    styleUrls: ['./expand-collapse-icon.component.scss'],
    standalone: false
})
export class ExpandCollapseIconComponent {
	@Input() expanded: boolean = false;
}
