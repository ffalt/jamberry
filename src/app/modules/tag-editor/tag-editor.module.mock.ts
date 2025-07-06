import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {ContextMenuModule} from '@app/modules/ngx-contextmenu';
import {of} from 'rxjs';
import {AutocompleteModule} from '../autocomplete';

export const TEST_TAGEDITOR_MODULE_IMPORTS = [
	ScrollingModule,
	NoopAnimationsModule,
	AutocompleteModule,
	ContextMenuModule.forRoot(),
	DialogOverlayModule,
	FormsModule,
	SharedModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];
export const TEST_TAGEDITOR_MODULE_PROVIDERS = [
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
