import {Component, input} from '@angular/core';

@Component({
	selector: 'app-background-text-list',
	templateUrl: './background-text-list.component.html',
	styleUrls: ['./background-text-list.component.scss'],
	standalone: false
})
export class BackgroundTextListComponent {
	readonly list = input<Array<any>>();
	readonly name = input<string>();
}
