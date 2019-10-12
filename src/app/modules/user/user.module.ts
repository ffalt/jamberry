import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '@shared/shared.module';
import {components} from './components';
import {pages} from './pages';
import {UserComponent} from './user.component';
import {routing} from './user.routing';

@NgModule({
	declarations: [
		UserComponent, ...components, ...pages
	],
	imports: [
		FormsModule,
		SharedModule,
		CommonModule,
		routing
	]
})
export class UserModule {
}
