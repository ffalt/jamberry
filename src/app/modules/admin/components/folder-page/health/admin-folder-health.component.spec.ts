import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {FolderHealthComponent} from '@admin/components/folder-health/folder-health.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {AdminFolderHealthComponent} from './admin-folder-health.component';

describe('AdminFolderHealthComponent', () => {
	let component: AdminFolderHealthComponent;
	let fixture: ComponentFixture<AdminFolderHealthComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [AdminFolderHealthComponent, MockComponent(FolderHealthComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderHealthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
