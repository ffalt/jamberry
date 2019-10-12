import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {TagEditorAutocompleteComponent} from '../autocomplete/tag-editor-autocomplete.component';
import {CellEditorTxtListComponent} from './cell-editor-txt-list.component';

describe('CellEditorTxtListComponent', () => {
	let component: CellEditorTxtListComponent;
	let fixture: ComponentFixture<CellEditorTxtListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, AutocompleteModule],
			providers: [],
			declarations: [CellEditorTxtListComponent, TagEditorAutocompleteComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorTxtListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
