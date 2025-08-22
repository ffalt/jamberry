import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_PROVIDERS } from '../../../../app.mock';
import { AdminBaseViewIdComponent } from './admin-base-view-id.component';

describe('AdminBaseViewIdComponent', () => {
	let component: AdminBaseViewIdComponent;
	let fixture: ComponentFixture<AdminBaseViewIdComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [AdminBaseViewIdComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminBaseViewIdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
