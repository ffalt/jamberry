import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {MatchApplyComponent} from '@app/modules/tag-editor/components/match-apply/match-apply.component';
import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';

describe('MatchApplyComponent', () => {
	let component: MatchApplyComponent;
	let fixture: ComponentFixture<MatchApplyComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
			providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
			declarations: [MatchApplyComponent],
			teardown: {destroyAfterEach: false}
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchApplyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
