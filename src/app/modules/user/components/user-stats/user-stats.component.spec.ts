import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserStatsComponent} from '@app/modules/user/components';
import {TEST_USER_MODULE_IMPORTS, TEST_USER_MODULE_PROVIDERS} from '@app/modules/user/user.module.mock';

describe('UserStatsComponent', () => {
	let component: UserStatsComponent;
	let fixture: ComponentFixture<UserStatsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_USER_MODULE_IMPORTS],
    providers: [...TEST_USER_MODULE_PROVIDERS],
    declarations: [UserStatsComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserStatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
