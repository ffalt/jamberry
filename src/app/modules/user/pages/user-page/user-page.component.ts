import {Component, inject} from '@angular/core';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	standalone: false
})
export class UserPageComponent {
	readonly auth = inject(JamAuthService);
}
