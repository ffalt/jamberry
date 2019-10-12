import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminBaseParentViewIdComponent} from './admin-base-parent-view-id.component';

describe('AdminBaseViewIdComponent', () => {
	let component: AdminBaseParentViewIdComponent;
	let fixture: ComponentFixture<AdminBaseParentViewIdComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [AdminBaseParentViewIdComponent]
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
