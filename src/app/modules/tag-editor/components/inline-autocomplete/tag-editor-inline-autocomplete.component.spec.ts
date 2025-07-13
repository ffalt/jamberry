import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {TagEditorInlineAutocompleteComponent} from './tag-editor-inline-autocomplete.component';

describe('InlineEditAutoCompleteComponent', () => {
	let component: TagEditorInlineAutocompleteComponent;
	let fixture: ComponentFixture<TagEditorInlineAutocompleteComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
    providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
    declarations: [TagEditorInlineAutocompleteComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TagEditorInlineAutocompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
