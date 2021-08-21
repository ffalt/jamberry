import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';
import {UserSidebarComponent} from './user-sidebar.component';

describe('UserSidebarComponent', () => {
	let component: UserSidebarComponent;
	let fixture: ComponentFixture<UserSidebarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [],
			providers: [],
			declarations: [UserSidebarComponent, MockComponent(SidebarComponent)]
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
