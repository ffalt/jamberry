import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminQueueRequestsComponent} from './admin-queue-requests.component';

describe('AdminQueueRequestsComponent', () => {
	let component: AdminQueueRequestsComponent;
	let fixture: ComponentFixture<AdminQueueRequestsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [AdminQueueRequestsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminQueueRequestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
