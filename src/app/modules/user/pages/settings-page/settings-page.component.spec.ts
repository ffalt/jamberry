import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_USER_MODULE_IMPORTS, TEST_USER_MODULE_PROVIDERS} from '@app/modules/user/user.module.mock';
import {SettingsPageComponent} from './settings-page.component';

describe('SettingsComponent', () => {
	let component: SettingsPageComponent;
	let fixture: ComponentFixture<SettingsPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_USER_MODULE_IMPORTS],
			providers: [...TEST_USER_MODULE_PROVIDERS],
			declarations: [SettingsPageComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
