import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSidebarComponent } from './user-sidebar.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('UserSidebarComponent', () => {
	let component: UserSidebarComponent;
	let fixture: ComponentFixture<UserSidebarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, UserSidebarComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserSidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
