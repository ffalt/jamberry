import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {AdminQueueRequestsComponent} from '@admin/components/admin-queue-requests/admin-queue-requests.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {AdminComponent} from './admin.component';
import {AdminSidebarComponent} from './components/admin-sidebar/admin-sidebar.component';

describe('AdminComponent', () => {
	let component: AdminComponent;
	let fixture: ComponentFixture<AdminComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [AdminComponent, MockComponent(AdminSidebarComponent), MockComponent(AdminQueueRequestsComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
