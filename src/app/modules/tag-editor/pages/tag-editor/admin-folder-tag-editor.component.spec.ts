import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TagEditorComponent} from '@app/modules/tag-editor/components/tag-editor/tag-editor.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {MockComponent} from 'ng-mocks';
import {AdminFolderTagEditorComponent} from './admin-folder-tag-editor.component';

describe('AdminFolderTagEditorComponent', () => {
	let component: AdminFolderTagEditorComponent;
	let fixture: ComponentFixture<AdminFolderTagEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
				providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
				declarations: [
					AdminFolderTagEditorComponent,
					MockComponent(TagEditorComponent)
				]
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderTagEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
