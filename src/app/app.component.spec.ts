import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {themeConfig} from '@app/app.module';
import {AuthCanActivateGuard} from '@app/guards';
import {HeaderModule} from '@app/modules/header';
import {HotkeyModule} from '@app/modules/hotkeys';
import {MainTabsModule} from '@app/modules/main-tabs';
import {MainTabsService} from '@app/modules/main-tabs/services';
import {PlayerModule} from '@app/modules/player';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from './app.component';
import {ThemeModule} from './modules/theme';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [
        NoopAnimationsModule,
        ThemeModule.forRoot(themeConfig),
        HeaderModule, PlayerModule, SharedModule, MainTabsModule,
        RouterTestingModule, HotkeyModule.forRoot(),
        ToastModule.forRoot(), TEST_JAM_MODULE
    ],
    providers: [MainTabsService, AuthCanActivateGuard],
    declarations: [AppComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
