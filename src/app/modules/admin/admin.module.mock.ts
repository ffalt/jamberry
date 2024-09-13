import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '../shared/shared.module';

export const TEST_ADMIN_MODULE_IMPORTS = [
	ScrollingModule, FormsModule, SharedModule, RouterTestingModule, NoopAnimationsModule,
	DialogOverlayModule, ContextMenuModule, ToastModule.forRoot(), TEST_JAM_MODULE
];
export const TEST_ADMIN_MODULE_PROVIDERS = [
];
