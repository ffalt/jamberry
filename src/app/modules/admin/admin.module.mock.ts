import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {of} from 'rxjs';
import {SharedModule} from '../shared/shared.module';

export const TEST_ADMIN_MODULE_IMPORTS = [
	ScrollingModule, FormsModule, SharedModule, NoopAnimationsModule,
	DialogOverlayModule, ContextMenuModule, ToastModule.forRoot(), TEST_JAM_MODULE
];
export const TEST_ADMIN_MODULE_PROVIDERS = [
	{
		provide: ActivatedRoute,
		useValue: {
			snapshot: {
				params: {},
				queryParams: {}
			},
			url: {
				pipe: () => of([])
			},
			params: of({}),
			queryParams: of({}),
			pipe: () => of({})
		}
	}
];
