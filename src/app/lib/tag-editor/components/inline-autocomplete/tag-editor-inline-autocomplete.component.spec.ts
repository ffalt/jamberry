import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TagEditorInlineAutocompleteComponent } from './tag-editor-inline-autocomplete.component';

describe('TagEditorInlineAutocompleteComponent', () => {
	let component: TagEditorInlineAutocompleteComponent;
	let fixture: ComponentFixture<TagEditorInlineAutocompleteComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [TagEditorInlineAutocompleteComponent],
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
