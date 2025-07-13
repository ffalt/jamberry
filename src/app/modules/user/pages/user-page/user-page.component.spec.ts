import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAvatarComponent, UserStatsComponent} from '@app/modules/user/components';
import {TEST_USER_MODULE_IMPORTS, TEST_USER_MODULE_PROVIDERS} from '@app/modules/user/user.module.mock';
import {MockComponent} from 'ng-mocks';
import {UserPageComponent} from './user-page.component';

describe('UserPageComponent', () => {
	let component: UserPageComponent;
	let fixture: ComponentFixture<UserPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_USER_MODULE_IMPORTS],
    providers: [...TEST_USER_MODULE_PROVIDERS],
    declarations: [
        UserPageComponent,
        MockComponent(UserAvatarComponent),
        MockComponent(UserStatsComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
