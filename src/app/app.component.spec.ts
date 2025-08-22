import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { themeConfig } from './app.providers';
import { AppComponent } from './app.component';
import { provideTheme } from '@modules/theme';
import { AuthCanActivateGuard } from '@core/guards/auth-can-active/auth.can-activate.guard';
import { TEST_IMPORTS, TEST_PROVIDERS } from './app.mock';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, AppComponent],
			providers: [...TEST_PROVIDERS,
				AuthCanActivateGuard,
				...provideTheme(themeConfig)
			],
			declarations: [],
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
