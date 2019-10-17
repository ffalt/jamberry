import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/context-menu';
import {DeferLoadModule} from '@app/modules/defer-load';
import {PlayerModule} from '@app/modules/player';
import {TracksModule} from '@app/modules/tracks';
import {SharedModule} from '@shared/shared.module';

import {components} from './components';
import {LibraryComponent} from './library.component';
import {routing} from './library.routing';
import {pages} from './pages';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ContextMenuModule,
		DeferLoadModule,
		DragDropModule,
		PlayerModule,
		AutocompleteModule,
		TracksModule,
		routing
	],
	declarations: [LibraryComponent, ...pages, ...components],
	providers: []
})

export class LibraryModule {
}
