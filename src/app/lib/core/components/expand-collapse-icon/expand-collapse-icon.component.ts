import { Component, input } from '@angular/core';
import { StringTogglePipe } from '../../pipes/string-toggle/string-toggle.pipe';

@Component({
	selector: 'app-expand-collapse-icon',
	templateUrl: './expand-collapse-icon.component.html',
	imports: [StringTogglePipe]
})
export class ExpandCollapseIconComponent {
	readonly expanded = input<boolean>(false);
}
