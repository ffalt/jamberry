import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PlayerModule} from '@app/modules/player/player.module';
import {SharedModule} from '@shared/shared.module';
import {components} from './components';
import {MainTabsService} from './services/main-tabs.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        PlayerModule
    ],
    declarations: [...components],
    exports: [...components],
    providers: [MainTabsService]
})
export class MainTabsModule {
}
