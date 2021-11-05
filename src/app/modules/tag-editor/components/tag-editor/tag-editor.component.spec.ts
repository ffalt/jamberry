import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ColumnToolComponent, TagEditorAutocompleteComponent} from '@app/modules/tag-editor/components';
import {CellEditorComponent} from '@app/modules/tag-editor/components/cell-editor/cell-editor.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {MockComponent} from 'ng-mocks';
import {TagEditorComponent} from './tag-editor.component';

describe('TagEditorComponent', () => {
	let component: TagEditorComponent;
	let fixture: ComponentFixture<TagEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
    imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
    providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
    declarations: [
        TagEditorComponent,
        MockComponent(CellEditorComponent),
        MockComponent(ColumnToolComponent),
        MockComponent(TagEditorAutocompleteComponent)
    ],
    teardown: { destroyAfterEach: false }
}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TagEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
