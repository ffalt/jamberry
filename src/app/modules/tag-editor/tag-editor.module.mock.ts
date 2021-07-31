import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {ContextMenuModule} from 'ngx-contextmenu';
import {AutocompleteModule} from '../autocomplete';

export const TEST_TAGEDITOR_MODULE_IMPORTS = [
	ScrollingModule,
	NoopAnimationsModule,
	AutocompleteModule,
	ContextMenuModule.forRoot(),
	DialogOverlayModule,
	FormsModule,
	SharedModule,
	RouterTestingModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];
export const TEST_TAGEDITOR_MODULE_PROVIDERS = [];
