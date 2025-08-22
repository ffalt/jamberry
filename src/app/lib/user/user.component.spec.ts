import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserComponent } from './user.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../app.mock';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, UserSidebarComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
