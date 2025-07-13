import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {MatchFileListComponent} from '@app/modules/tag-editor/components/match-file-list/match-file-list.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';

describe('MatchReleaseComponent', () => {
	let component: MatchFileListComponent;
	let fixture: ComponentFixture<MatchFileListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
			providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
			declarations: [MatchFileListComponent],
			teardown: {destroyAfterEach: false}
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchFileListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
