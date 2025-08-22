import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastModule } from '@modules/toast';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ActionsService } from '@core/services/actions/actions.service';
import { PlaylistDialogsService } from '@core/services/playlist-dialogs/playlist-dialogs.service';
import { PlaylistService } from '@core/services/playlist/playlist.service';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { MenuService } from '@core/services/contextmenu/menu.service';
import { JamConfiguration, JamModule } from '@jam';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import { DialogOverlayModule } from '@modules/dialog-overlay/dialog-overlay.module';
import { MainTabsService } from './lib/main-tabs/services/main-tabs.service';
import { SettingsStoreService } from '@core/services/settings-store/settings-store.service';
import { UserStorageService } from '@core/services/userstorage/userstorage.service';
import { PushNotificationService } from '@core/services/push-notification/push-notification.service';
import { LocalstorageService } from '@core/services/localstorage/localstorage.service';
import { HotkeyModule } from '@modules/hotkeys';

export const TEST_JAM_MODULE = JamModule.forRoot(
	[{
		provide: JamConfiguration,
		useClass: ConfigurationService
	}]
);

export const TEST_IMPORTS = [
	CommonModule,
	FormsModule,
	OverlayModule,
	DialogOverlayModule,
	HotkeyModule.forRoot(),
	ContextMenuModule.forRoot(),
	ToastModule.forRoot(),
	TEST_JAM_MODULE
];

export const TEST_PROVIDERS = [
	MainTabsService,
	ActionsService,
	PlaylistDialogsService,
	PlaylistService,
	PodcastService,
	MenuService,
	SettingsStoreService,
	UserStorageService,
	PushNotificationService,
	LocalstorageService,
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
			paramMap: of({}),
			queryParams: of({}),
			pipe: () => of({})
		}
	}
];
