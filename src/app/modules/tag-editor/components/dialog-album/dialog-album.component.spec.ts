import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {TagEditorAutocompleteComponent} from '@app/modules/tag-editor/components/autocomplete/tag-editor-autocomplete.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {MockComponent} from 'ng-mocks';
import {DialogAlbumComponent} from './dialog-album.component';

describe('DialogAlbumComponent', () => {
	let component: DialogAlbumComponent;
	let fixture: ComponentFixture<DialogAlbumComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
    providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
    declarations: [DialogAlbumComponent, MockComponent(TagEditorAutocompleteComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogAlbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
