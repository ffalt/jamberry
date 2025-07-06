import {FormsModule} from '@angular/forms';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {PlayerModule} from '@app/modules/player';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';

export const TEST_USER_MODULE_IMPORTS = [
	FormsModule, PlayerModule, SharedModule, DialogOverlayModule, ToastModule.forRoot(), TEST_JAM_MODULE
];

export const TEST_USER_MODULE_PROVIDERS = [
];
