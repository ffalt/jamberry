import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {RouterTestingModule} from '@angular/router/testing';
import {AppService} from '@core/services';
import {SharedModule} from '@shared/shared.module';
import {UserSidebarComponent} from './components/user-sidebar/user-sidebar.component';
import {UserComponent} from './user.component';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, RouterTestingModule, SharedModule],
			providers: [AppService],
			declarations: [UserComponent, UserSidebarComponent]
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
