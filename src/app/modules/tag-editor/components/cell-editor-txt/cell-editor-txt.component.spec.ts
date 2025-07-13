import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {TagEditorInlineAutocompleteComponent} from '@app/modules/tag-editor/components/inline-autocomplete/tag-editor-inline-autocomplete.component';
import {TagEditorAutocompleteComponent} from '../autocomplete/tag-editor-autocomplete.component';
import {CellEditorTxtComponent} from './cell-editor-txt.component';

describe('CellEditorTxtComponent', () => {
	let component: CellEditorTxtComponent;
	let fixture: ComponentFixture<CellEditorTxtComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule, AutocompleteModule],
    providers: [],
    declarations: [CellEditorTxtComponent, TagEditorAutocompleteComponent, TagEditorInlineAutocompleteComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorTxtComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
