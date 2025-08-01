import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminBaseViewIdComponent} from './admin-base-view-id.component';

describe('AdminBaseViewIdComponent', () => {
	let component: AdminBaseViewIdComponent;
	let fixture: ComponentFixture<AdminBaseViewIdComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [AdminBaseViewIdComponent],
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
