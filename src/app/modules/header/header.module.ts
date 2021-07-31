import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from 'ngx-contextmenu';
import {SharedModule} from '@shared/shared.module';
import {ContextMenuUserComponent} from './components/context-menu-user/context-menu-user.component';
import {HeaderComponent} from './components/header/header.component';
import {SearchBoxComponent} from './components/search-box/search-box.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ContextMenuModule,
		AutocompleteModule,
		RouterModule,
		SharedModule
	],
	exports: [
		HeaderComponent
	],
	declarations: [
		HeaderComponent,
		ContextMenuUserComponent,
		SearchBoxComponent
	]
})
export class HeaderModule {
}
