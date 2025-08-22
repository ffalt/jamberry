import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_PROVIDERS } from '../../../../app.mock';
import { AdminStartComponent } from './admin.start.component';

describe('AdminStartComponent', () => {
	let component: AdminStartComponent;
	let fixture: ComponentFixture<AdminStartComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [AdminStartComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminStartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
