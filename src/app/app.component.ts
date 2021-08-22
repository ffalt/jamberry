import {
	ApplicationRef,
	Component,
	ComponentFactoryResolver,
	ElementRef,
	HostBinding,
	HostListener,
	Injector,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthCanActivateGuard} from '@app/guards';
import {DeferLoadService} from '@app/modules/defer-load';
import {Hotkey, HotkeysService} from '@app/modules/hotkeys';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {TabPortalOutlet} from '@app/modules/tab-portal';
import {ThemeService} from '@app/modules/theme';
import {HOTKEYS} from '@app/utils/keys';
import {AppService, PlayerService, SettingsStoreService, TitleService} from '@core/services';
import {JamAuthService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	@HostBinding('class.expand') get expandBody(): boolean {
		return !!this.tabService?.mainTab?.active;
	}

	@ViewChild('tabContentOutlet', {static: true}) tabContentOutlet?: ElementRef;
	protected unsubscribe = new Subject();

	constructor(
		public player: PlayerService,
		public app: AppService,
		public auth: JamAuthService,
		public tabService: MainTabsService,
		private authGuard: AuthCanActivateGuard,
		private element: ElementRef,
		private hotkeysService: HotkeysService,
		private route: ActivatedRoute,
		private router: Router,
		private deferLoadService: DeferLoadService,
		private settingsStore: SettingsStoreService,
		private themeService: ThemeService,
		private titleService: TitleService, // do not remove or it gets remove by optimizer,
		private injector: Injector,
		private appRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		settingsStore.settingsChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.setTheme();
		});
		if (!this.auth.loaded) {
			this.auth.load().catch(e => {
				console.error(e);
			});
		}
		this.router.events.forEach(event => {
			this.tabService.switchToMain();
		}).catch(e => {
			console.error(e);
		});
		app.standalone = this.isStandaloneWebApp() || this.isElectronApp() || this.isMacGapApp();
		this.setTheme();
		this.setKeyboardShortcuts();
		this.determinateScreen();
	}

	ngOnInit(): void {
		this.tabService.init(
			new TabPortalOutlet(this.tabService.tabs,
				this.tabContentOutlet?.nativeElement,
				this.componentFactoryResolver,
				this.appRef,
				this.injector)
		);
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

	@HostListener('window:scroll', ['$event'])
	scrollTrack(event: Event): void {
		this.deferLoadService.notifyScroll({name: 'app'});
	}

	@HostListener('window:resize', ['$event'])
	resize(event: Event): void {
		this.determinateScreen();
		this.tabService.switchToMain();
	}

	private determinateScreen(): void {
		this.app.smallscreen = window.innerHeight < 400 || window.innerWidth < 522;
	}

	private setKeyboardShortcuts(): void {
		this.hotkeysService.add(new Hotkey(HOTKEYS.playPause.shortcut, (event: KeyboardEvent): boolean => {
			this.player.togglePlayPause();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.playPause.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.nextTrack.shortcut, (event: KeyboardEvent): boolean => {
			this.player.next();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.nextTrack.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.previousTrack.shortcut, (event: KeyboardEvent): boolean => {
			this.player.previous();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.previousTrack.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.volumeUp.shortcut, (event: KeyboardEvent): boolean => {
			this.player.volumeUp();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.volumeUp.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.forward.shortcut, (event: KeyboardEvent): boolean => {
			this.player.forward(10);
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.forward.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.rewind.shortcut, (event: KeyboardEvent): boolean => {
			this.player.rewind(10);
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.rewind.name));

		this.hotkeysService.add(new Hotkey(HOTKEYS.volumeDown.shortcut, (event: KeyboardEvent): boolean => {
			this.player.volumeDown();
			return false; // Prevent bubbling
		}, undefined, HOTKEYS.volumeDown.name));

		// this.hotkeysService.add(new Hotkey('q', (event: KeyboardEvent): boolean => {
		// 	this.player.showQueue = !this.player.showQueue;
		// 	return false; // Prevent bubbling
		// }, undefined, 'Show / Hide Queue'));
	}

}
