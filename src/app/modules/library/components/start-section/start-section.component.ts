import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

export interface StartSectionItem {
	obj: Jam.Base;

	click(): void;
}

@Component({
	selector: 'app-start-section',
	templateUrl: './start-section.component.html',
	styleUrls: ['./start-section.component.scss']
})
export class StartSectionComponent {
	@Input() name?: string;
	@Input() list?: Array<StartSectionItem>;
}
