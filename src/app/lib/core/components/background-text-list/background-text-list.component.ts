import { Component, input } from '@angular/core';
import { BackgroundTextComponent } from '../background-text/background-text.component';

@Component({
	selector: 'app-background-text-list',
	templateUrl: './background-text-list.component.html',
	imports: [BackgroundTextComponent]
})
export class BackgroundTextListComponent {
	readonly list = input<Array<any>>();
	readonly name = input<string>();
}
