import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
	ImageBase64Component,
	MatchReleaseComponent,
	ScoreBoxComponent,
	TagEditorAutocompleteComponent
} from '@app/modules/tag-editor/components';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {MockComponent} from 'ng-mocks';

describe('MatchReleaseComponent', () => {
	let component: MatchReleaseComponent;
	let fixture: ComponentFixture<MatchReleaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
			providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
			declarations: [
				MatchReleaseComponent,
				MockComponent(ImageBase64Component),
				MockComponent(ScoreBoxComponent),
				MockComponent(TagEditorAutocompleteComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchReleaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
