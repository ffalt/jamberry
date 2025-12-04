import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { SplitterComponent } from '@core/components/splitter/splitter.component';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	imports: [
		RouterModule,
		UserSidebarComponent,
		SplitterComponent
	]
})

export class UserComponent {
}
