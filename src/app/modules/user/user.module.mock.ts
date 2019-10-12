import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {PlayerModule} from '@app/modules/player';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';

export const TEST_USER_MODULE_IMPORTS = [
	FormsModule, RouterTestingModule, PlayerModule, SharedModule, DialogOverlayModule, ToastModule.forRoot(), TEST_JAM_MODULE
];

export const TEST_USER_MODULE_PROVIDERS = [
];
