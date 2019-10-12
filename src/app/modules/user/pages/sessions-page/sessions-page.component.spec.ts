import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SessionsPageComponent} from '@app/modules/user/pages/sessions-page/sessions-page.component';
import {TEST_USER_MODULE_IMPORTS, TEST_USER_MODULE_PROVIDERS} from '@app/modules/user/user.module.mock';

describe('SessionsPageComponent', () => {
	let component: SessionsPageComponent;
	let fixture: ComponentFixture<SessionsPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_USER_MODULE_IMPORTS],
			providers: [...TEST_USER_MODULE_PROVIDERS],
			declarations: [SessionsPageComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SessionsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
