import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFolderTagEditorPageComponent } from './admin-folder-tag-editor-page.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('AdminFolderTagEditorPageComponent', () => {
	let component: AdminFolderTagEditorPageComponent;
	let fixture: ComponentFixture<AdminFolderTagEditorPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_IMPORTS, AdminFolderTagEditorPageComponent],
				providers: [...TEST_PROVIDERS],
				teardown: { destroyAfterEach: false }
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderTagEditorPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
