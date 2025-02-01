import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-view-header-slim',
    templateUrl: './header-slim.component.html',
    styleUrls: ['./header-slim.component.scss'],
    standalone: false
})
export class HeaderSlimComponent {
	@Input() section?: string;
}
