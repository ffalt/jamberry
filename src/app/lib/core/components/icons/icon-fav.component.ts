import { Component, input } from '@angular/core';
import { IconHeartEmptyComponent } from '@core/components/icons/icon-heart-empty.component';
import { IconHeartFullComponent } from '@core/components/icons/icon-heart-full.component';

@Component({
	selector: 'app-fav-icon',
	templateUrl: './icon-fav.component.html',
	imports: [IconHeartEmptyComponent, IconHeartFullComponent],
	host: { class: 'icon' }
})
export class IconFavComponent {
	readonly faved = input<number>();
}
