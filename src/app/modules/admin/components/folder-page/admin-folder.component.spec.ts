import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderTreeComponent} from '../folder-tree/folder-tree.component';
import {AdminFolderComponent} from './admin-folder.component';

describe('AdminFoldersComponent', () => {
	let component: AdminFolderComponent;
	let fixture: ComponentFixture<AdminFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [
				AdminFolderComponent,
				FolderTreeComponent
			],
			teardown: {destroyAfterEach: false}
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
