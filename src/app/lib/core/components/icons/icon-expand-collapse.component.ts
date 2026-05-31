import { Component, input } from '@angular/core';
import { IconDownOpenMiniComponent } from '@core/components/icons/icon-down-open-mini.component';
import { IconUpOpenMiniComponent } from '@core/components/icons/icon-up-open-mini.component';

@Component({
	selector: 'app-expand-collapse-icon',
	templateUrl: './icon-expand-collapse.component.html',
	imports: [IconDownOpenMiniComponent, IconUpOpenMiniComponent]
})
export class IconExpandCollapseComponent {
	readonly expanded = input<boolean>(false);
}
