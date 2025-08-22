import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { UserStatsComponent } from './user-stats.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('UserStatsComponent', () => {
	let component: UserStatsComponent;
	let fixture: ComponentFixture<UserStatsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, UserStatsComponent],
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
