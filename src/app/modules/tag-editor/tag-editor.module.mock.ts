import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AdminCoreModule} from '@app/modules/admin-core/admin-core.module';
import {ContextMenuModule} from '@app/modules/context-menu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {AutocompleteModule} from '../autocomplete';

export const TEST_TAGEDITOR_MODULE_IMPORTS = [
	AdminCoreModule, ScrollingModule, NoopAnimationsModule, AutocompleteModule, ContextMenuModule, DialogOverlayModule,
	FormsModule, SharedModule, RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE
];
export const TEST_TAGEDITOR_MODULE_PROVIDERS = [
];
