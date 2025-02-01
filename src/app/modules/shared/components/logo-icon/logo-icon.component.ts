import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-logo-icon',
    templateUrl: './logo-icon.component.html',
    styleUrls: ['./logo-icon.component.scss'],
    standalone: false
})
export class LogoIconComponent {
	@Input() size: number = 30;
}
