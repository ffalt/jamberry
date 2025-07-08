import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {MenuService} from '@shared/services';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';

export const TEST_PLAYER_MODULE_IMPORTS = [
	CommonModule,
	ScrollingModule,
	DragDropModule,
	ContextMenuModule.forRoot(),
	SharedModule,
	DialogOverlayModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];
export const TEST_PLAYER_MODULE_PROVIDERS = [
	MainTabsService, MenuService
];
