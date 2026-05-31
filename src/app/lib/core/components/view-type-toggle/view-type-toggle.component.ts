import { Component, input, model } from '@angular/core';
import { IconViewDetailsComponent } from '@core/components/icons/icon-view-details.component';
import { IconViewTilesComponent } from '@core/components/icons/icon-view-tiles.component';

@Component({
	imports: [IconViewDetailsComponent, IconViewTilesComponent],
	selector: 'app-view-type-toggle',
	templateUrl: './view-type-toggle.component.html',
	styleUrls: ['./view-type-toggle.component.scss']
})
export class ViewTypeToggleComponent {
	readonly viewTypeList = model<boolean>(false);
	readonly headline = input<string>();
}
