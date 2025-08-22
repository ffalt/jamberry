import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../../app.mock';
import { AdminFolderFoldersComponent } from './admin-folder-folders.component';

describe('AdminFolderFoldersComponent', () => {
	let component: AdminFolderFoldersComponent;
	let fixture: ComponentFixture<AdminFolderFoldersComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_IMPORTS, AdminFolderFoldersComponent],
				providers: [...TEST_PROVIDERS],
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
