import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {AdminFolderFoldersComponent, FolderHealthComponent, FolderListComponent} from '@admin/components';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('AdminFolderFoldersComponent', () => {
	let component: AdminFolderFoldersComponent;
	let fixture: ComponentFixture<AdminFolderFoldersComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [AdminFolderFoldersComponent, MockComponent(FolderListComponent), MockComponent(FolderHealthComponent)],
    teardown: { destroyAfterEach: false }
}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderFoldersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
