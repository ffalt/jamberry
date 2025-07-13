import {OverlayModule} from '@angular/cdk/overlay';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/modules/autocomplete';
import {TagEditorAutocompleteComponent} from './tag-editor-autocomplete.component';

describe('AutocompleteComponent', () => {
	let component: TagEditorAutocompleteComponent;
	let fixture: ComponentFixture<TagEditorAutocompleteComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule, AutocompleteModule, OverlayModule],
    providers: [],
    declarations: [TagEditorAutocompleteComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TagEditorAutocompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
