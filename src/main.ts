/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { provideTheme } from '@modules/theme';
import { FormsModule } from '@angular/forms';
import { JamConfiguration, JamModule } from '@jam';
import { HotkeyModule } from '@modules/hotkeys';
import { ToastModule, ToastService } from '@modules/toast';
import { DialogOverlayModule } from '@modules/dialog-overlay';
import { PortalModule } from '@angular/cdk/portal';
import { routing } from './app/app.routing';
import { AppComponent } from './app/app.component';
import { AuthCanActivateGuard } from '@core/guards/auth-can-active/auth.can-activate.guard';
import { PendingChangesGuard } from '@core/guards/pending-changes/pending-changes.guard';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { CacheService } from '@core/services/uri-cache/cache.service';
import { ConfigurationServiceFactory, provideHTTPCache, themeConfig } from './app/app.providers';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { AppService } from '@core/services/app/app.service';
import { MainTabsService } from './app/lib/main-tabs/services/main-tabs.service';
import { TitleService } from '@core/services/title/title.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { PlaylistService } from '@core/services/playlist/playlist.service';
import { UiStateService } from '@core/services/ui-state/ui-state.service';
import { UserStorageService } from '@core/services/userstorage/userstorage.service';
import { LocalstorageService } from '@core/services/localstorage/localstorage.service';
import { NavigService } from '@core/services/navig/navig.service';
import { DeferLoadService } from '@modules/defer-load/defer-load.service';
import { MenuService } from '@core/services/contextmenu/menu.service';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { ActionsService } from '@core/services/actions/actions.service';
import { PlaylistDialogsService } from '@core/services/playlist-dialogs/playlist-dialogs.service';
import { PodcastService } from '@core/services/podcast/podcast.service';
import { SettingsStoreService } from '@core/services/settings-store/settings-store.service';
import { PushNotificationService } from '@core/services/push-notification/push-notification.service';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			FormsModule,
			JamModule.forRoot({
				provide: JamConfiguration,
				useFactory: ConfigurationServiceFactory,
				deps: [ConfigurationService]
			}),
			HotkeyModule.forRoot(),
			ToastModule.forRoot(),
			ContextMenuModule.forRoot({ autoFocus: true }),
			DialogOverlayModule,
			PortalModule,
			routing
		),
		AuthCanActivateGuard,
		PendingChangesGuard,
		CacheService,
		PlayerService,
		MainTabsService,
		PlaylistService,
		TitleService,
		AppService,
		ToastService,
		UiStateService,
		LocalstorageService,
		UserStorageService,
		DeferLoadService,
		NotifyService,
		MenuService,
		DialogsService,
		NavigService,
		QueueService,
		ActionsService,
		PodcastService,
		PlaylistDialogsService,
		SettingsStoreService,
		PushNotificationService,
		provideHTTPCache(),
		provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
		...provideTheme(themeConfig)
	]
})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((error: unknown) => {
		console.error(error);
	});
