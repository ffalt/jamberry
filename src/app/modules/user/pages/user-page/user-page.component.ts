import {Component} from '@angular/core';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

	constructor(public auth: JamAuthService) {
	}

}
