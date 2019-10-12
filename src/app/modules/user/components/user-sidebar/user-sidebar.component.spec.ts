import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppService} from '@core/services';
import {UserSidebarComponent} from './user-sidebar.component';

describe('UserSidebarComponent', () => {
	let component: UserSidebarComponent;
	let fixture: ComponentFixture<UserSidebarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [AppService],
			declarations: [UserSidebarComponent]
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
