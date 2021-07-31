import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {DeferLoadModule} from '@app/modules/defer-load';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {PlayerModule} from '@app/modules/player';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {LibraryService} from '@library/services';
import {IndexService, PlaylistService, PodcastService} from '@shared/services';
import {SharedModule} from '@shared/shared.module';
import {ContextMenuModule} from 'ngx-contextmenu';

export const TEST_LIBRARY_IMPORTS = [
	FormsModule,
	AutocompleteModule,
	SharedModule,
	PlayerModule,
	DialogOverlayModule,
	RouterTestingModule,
	ContextMenuModule.forRoot(),
	NoopAnimationsModule,
	DeferLoadModule,
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];
export const TEST_LIBRARY_PROVIDERS = [
	IndexService, PlaylistService, PodcastService, LibraryService
];
