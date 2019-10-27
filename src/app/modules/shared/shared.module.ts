import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {components, entryComponents} from './components';
import {directives} from './directives';
import {pipes} from './pipes';
import {services} from './services';

@NgModule({
	imports: [CommonModule, FormsModule, RouterModule],
	declarations: [...components, ...pipes, ...directives],
	exports: [...components, ...pipes, ...directives],
	entryComponents: [...entryComponents],
	providers: [...services]
})
export class SharedModule {
}
