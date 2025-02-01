import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-background-text',
    templateUrl: './background-text.component.html',
    styleUrls: ['./background-text.component.scss'],
    standalone: false
})
export class BackgroundTextComponent {
	@Input() text?: string;
}
