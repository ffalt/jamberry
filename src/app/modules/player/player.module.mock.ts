import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {HammerModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {ContextMenuModule} from '@app/modules/context-menu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';

export const TEST_PLAYER_MODULE_IMPORTS = [
	CommonModule,
	RouterTestingModule,
	ScrollingModule,
	DragDropModule,
	HammerModule,
	ContextMenuModule,
	SharedModule,
	DialogOverlayModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];
export const TEST_PLAYER_MODULE_PROVIDERS = [
	MainTabsService
];
