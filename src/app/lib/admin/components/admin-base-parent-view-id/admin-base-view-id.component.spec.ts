import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_PROVIDERS } from '../../../../app.mock';
import { AdminBaseParentViewIdComponent } from './admin-base-parent-view-id.component';

describe('AdminBaseViewIdComponent', () => {
	let component: AdminBaseParentViewIdComponent;
	let fixture: ComponentFixture<AdminBaseParentViewIdComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [AdminBaseParentViewIdComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminBaseParentViewIdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
