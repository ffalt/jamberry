import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {TagEditorInlineAutocompleteComponent} from '@app/modules/tag-editor/components/inline-autocomplete/tag-editor-inline-autocomplete.component';
import {TagEditorAutocompleteComponent} from '../autocomplete/tag-editor-autocomplete.component';
import {CellEditorDisplayComponent} from './cell-editor-display.component';

describe('CellEditorTxtComponent', () => {
	let component: CellEditorDisplayComponent;
	let fixture: ComponentFixture<CellEditorDisplayComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule, AutocompleteModule],
    providers: [],
    declarations: [CellEditorDisplayComponent, TagEditorAutocompleteComponent, TagEditorInlineAutocompleteComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
