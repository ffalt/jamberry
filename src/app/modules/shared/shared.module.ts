import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DeferLoadModule} from '@app/modules/defer-load';

import {components} from './components';
import {directives} from './directives';
import {pipes} from './pipes';
import {services} from './services';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, DeferLoadModule, NgOptimizedImage],
    declarations: [...components, ...pipes, ...directives],
    exports: [...components, ...pipes, ...directives],
    providers: [...services]
})
export class SharedModule {
}
