import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-view-header-slim',
	templateUrl: './header-slim.component.html',
	styleUrls: ['./header-slim.component.scss']
})
export class HeaderSlimComponent {
	@Input() section?: string;
}
