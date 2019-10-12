import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {MatchReleaseComponent} from '../match-release/match-release.component';
import {DialogMatchReleaseComponent} from './dialog-match-release.component';

describe('DialogMatchReleaseComponent', () => {
	let component: DialogMatchReleaseComponent;
	let fixture: ComponentFixture<DialogMatchReleaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
			providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
			declarations: [DialogMatchReleaseComponent, MockComponent(MatchReleaseComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogMatchReleaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
