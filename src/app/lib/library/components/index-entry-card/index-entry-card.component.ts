import { Component, input } from '@angular/core';
import type { IndexEntry } from '@core/services/index/index.service';
import { DeferLoadDirective } from '@modules/defer-load/defer-load.directive';
import { LimitPipe } from '@core/pipes/limit.pipe';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';

@Component({
	selector: 'app-index-entry-card',
	templateUrl: './index-entry-card.component.html',
	styleUrls: ['./index-entry-card.component.scss'],
	imports: [DeferLoadDirective, LimitPipe, CoverartImageComponent]
})
export class IndexEntryCardComponent {
	readonly entry = input<IndexEntry>();
	visible: boolean = false;

	gotInView(): void {
		this.visible = true;
	}
}
