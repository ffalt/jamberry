import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TagEditorComponent} from '@app/modules/tag-editor/components/tag-editor/tag-editor.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {MockComponent} from 'ng-mocks';
import {AdminFolderTagEditorPageComponent} from './admin-folder-tag-editor-page.component';

describe('AdminFolderTagEditorComponent', () => {
	let component: AdminFolderTagEditorPageComponent;
	let fixture: ComponentFixture<AdminFolderTagEditorPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
				providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
				declarations: [
					AdminFolderTagEditorPageComponent,
					MockComponent(TagEditorComponent)
				]
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
