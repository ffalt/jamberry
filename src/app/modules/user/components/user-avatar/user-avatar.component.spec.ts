import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_USER_MODULE_IMPORTS, TEST_USER_MODULE_PROVIDERS} from '@app/modules/user/user.module.mock';
import {UserAvatarComponent} from './user-avatar.component';

describe('UserAvatarComponent', () => {
	let component: UserAvatarComponent;
	let fixture: ComponentFixture<UserAvatarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_USER_MODULE_IMPORTS],
    providers: [...TEST_USER_MODULE_PROVIDERS],
    declarations: [UserAvatarComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserAvatarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
