import {FolderService} from '@admin/services';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ContextMenuModule} from '@app/modules/context-menu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {AutocompleteModule} from '../autocomplete';

export const TEST_TAGEDITOR_MODULE_IMPORTS = [
	ScrollingModule, NoopAnimationsModule, AutocompleteModule, ContextMenuModule, DialogOverlayModule,
	FormsModule, SharedModule, RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE
];
export const TEST_TAGEDITOR_MODULE_PROVIDERS = [
	FolderService // TODO: this is a service from parent module (admin), move to a shared module
];
