import { Component, input } from '@angular/core';
import type { Jam } from '@jam';
import { LimitPipe } from '@core/pipes/limit.pipe';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';

export interface StartSectionItem {
	obj: Jam.Base;

	click(): void;
}

@Component({
	selector: 'app-start-section',
	templateUrl: './start-section.component.html',
	styleUrls: ['./start-section.component.scss'],
	imports: [LimitPipe, ClickKeyEnterDirective, CoverartImageComponent]
})
export class StartSectionComponent {
	readonly name = input<string>();
	readonly list = input<Array<StartSectionItem>>();
}
