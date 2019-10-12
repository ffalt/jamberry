import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {ContextMenuModule} from '@app/modules/context-menu';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';

export const TEST_HEADER_MODULE_IMPORTS = [
	CommonModule,
	FormsModule,
	ContextMenuModule,
	AutocompleteModule,
	RouterTestingModule,
	SharedModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];

export const TEST_HEADER_MODULE_PROVIDERS = [
	MainTabsService
];
