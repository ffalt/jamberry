import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/context-menu';
import {SharedModule} from '@shared/shared.module';
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
		SearchBoxComponent
	]
})
export class HeaderModule {
}
