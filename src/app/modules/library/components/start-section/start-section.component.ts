import {Component, input} from '@angular/core';
import {Jam} from '@jam';

export interface StartSectionItem {
	obj: Jam.Base;

	click(): void;
}

@Component({
	selector: 'app-start-section',
	templateUrl: './start-section.component.html',
	styleUrls: ['./start-section.component.scss'],
	standalone: false
})
export class StartSectionComponent {
	readonly name = input<string>();
	readonly list = input<Array<StartSectionItem>>();
}
