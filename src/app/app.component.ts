import {Component, Injector, OnDestroy, OnInit, inject, viewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {DeferLoadService} from '@app/modules/defer-load';
import {Hotkey, HotkeysService} from '@app/modules/hotkeys';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {TabPortalOutlet} from '@app/modules/tab-portal';
import {ThemeService} from '@app/modules/theme';
import {HOTKEYS} from '@app/utils/keys';
import {AppService, PlayerService, SettingsStoreService} from '@core/services';
import {JamAuthService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false,
	host: {
		'[class.expand]': 'expandBody',
		'(window:scroll)': 'scrollTrack()',
		'(window:resize)': 'resize()'
	}
})
export class AppComponent implements OnInit, OnDestroy {
	readonly tabContentOutlet = viewChild.required('tabContentOutlet', {read: ViewContainerRef});
	readonly player = inject(PlayerService);
	readonly app = inject(AppService);
	readonly auth = inject(JamAuthService);
	private readonly tabService = inject(MainTabsService);
	private readonly unsubscribe = new Subject<void>();
	private readonly hotkeysService = inject(HotkeysService);
	private readonly router = inject(Router);
	private readonly deferLoadService = inject(DeferLoadService);
	private readonly settingsStore = inject(SettingsStoreService);
	private readonly themeService = inject(ThemeService);
	private readonly injector = inject(Injector);

	get expandBody(): boolean {
		return !!this.tabService?.mainTab?.active;
	}

	constructor() {
		this.settingsStore.settingsChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.setTheme();
		});
		if (!this.auth.loaded) {
			this.auth.load().catch(e => {
				console.error(e);
			});
		}
		this.router.events.forEach(() => {
			this.tabService.switchToMain();
		}).catch(e => {
			console.error(e);
		});
		this.app.standalone = this.isStandaloneWebApp() || this.isElectronApp() || this.isMacGapApp();
		this.setTheme();
		this.setKeyboardShortcuts();
		this.determinateScreen();
	}

	ngOnInit(): void {
		this.tabService.init(new TabPortalOutlet(this.tabService.tabs, this.tabContentOutlet(), this.injector));
	}

	ngOnDestroy(): void {
		this.tabService.dispose();
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	isStandaloneWebApp(): boolean {
		const nav = navigator as any;
		return (nav?.standalone === true) ||
			(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
	}

	isElectronApp(): boolean {
		return (navigator.userAgent.toLowerCase().includes('electron/'));
	}

	isMacGapApp(): boolean {
		return (navigator.userAgent.includes('MacGap'));
	}

	setTheme(): void {
		this.themeService.setTheme(this.app.settings.theme || 'dark');
	}

	scrollTrack(): void {
		this.deferLoadService.notifyScroll({name: 'app'});
	}

	resize(): void {
		this.determinateScreen();
		this.tabService.switchToMain();
	}

	private determinateScreen(): void {
		this.app.smallscreen = window.innerHeight < 400 || window.innerWidth < 522;
	}

	private setKeyboardShortcuts(): void {
		this.hotkeysService.add(new Hotkey(HOTKEYS.playPause.shortcut, (): boolean => {
			this.player.togglePlayPause();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.playPause.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.nextTrack.shortcut, (): boolean => {
			this.player.next();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.nextTrack.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.previousTrack.shortcut, (): boolean => {
			this.player.previous();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.previousTrack.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.volumeUp.shortcut, (): boolean => {
			this.player.volumeUp();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.volumeUp.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.forward.shortcut, (): boolean => {
			this.player.forward(10);
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.forward.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.rewind.shortcut, (): boolean => {
			this.player.rewind(10);
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.rewind.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.volumeDown.shortcut, (): boolean => {
			this.player.volumeDown();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.volumeDown.name));

		// this.hotkeysService.add(new Hotkey('q', (event: KeyboardEvent): boolean => {
		// 	this.player.showQueue = !this.player.showQueue;
		// 	return false; // Prevent bubbling
		// }, undefined, 'Show / Hide Queue'));
	}
}
