import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { TabComponent } from '@modules/tab-portal';

@Component({
	selector: 'app-tab-main',
	templateUrl: './tab-main.component.html',
	styleUrls: ['./tab-main.component.scss'],
	imports: [RouterModule]
})
export class TabMainComponent implements TabComponent {
	onActivate(): void {
		//
	}
}
