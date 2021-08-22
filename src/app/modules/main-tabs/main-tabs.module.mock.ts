import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {PlayerModule} from '@app/modules/player';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {MenuService} from '@shared/services';
import {SharedModule} from '@shared/shared.module';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';

export const TEST_MAINTABS_IMPORTS = [
	FormsModule,
	RouterTestingModule,
	PlayerModule,
	SharedModule,
	ContextMenuModule.forRoot(),
	DialogOverlayModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];

export const TEST_MAINTABS_PROVIDERS = [MenuService];
