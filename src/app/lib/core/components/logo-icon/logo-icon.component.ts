import { Component, input } from '@angular/core';

@Component({
	selector: 'app-logo-icon',
	templateUrl: './logo-icon.component.html',
	styleUrls: ['./logo-icon.component.scss']
})
export class LogoIconComponent {
	readonly size = input<number>(30);
}
