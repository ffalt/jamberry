import { Component, input } from '@angular/core';

@Component({
	selector: 'app-background-text',
	templateUrl: './background-text.component.html',
	styleUrls: ['./background-text.component.scss']
})
export class BackgroundTextComponent {
	readonly text = input<string>();
}
