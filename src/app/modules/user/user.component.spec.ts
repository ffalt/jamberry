import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {AppService} from '@core/services';
import {SharedModule} from '@shared/shared.module';
import {UserSidebarComponent} from './components/user-sidebar/user-sidebar.component';
import {UserComponent} from './user.component';
import {ActivatedRoute} from '@angular/router';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, SharedModule],
			providers: [
				AppService,
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							params: {},
							queryParams: {}
						}
					}
				}
			],
			declarations: [UserComponent, UserSidebarComponent],
			teardown: {destroyAfterEach: false}
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
