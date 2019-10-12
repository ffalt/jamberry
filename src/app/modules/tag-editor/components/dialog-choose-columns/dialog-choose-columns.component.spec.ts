import {TEST_TAGEDITOR_MODULE_IMPORTS, TEST_TAGEDITOR_MODULE_PROVIDERS} from '@app/modules/tag-editor/tag-editor.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogChooseColumnsComponent} from './dialog-choose-columns.component';

describe('DialogChooseColumnsComponent', () => {
	let component: DialogChooseColumnsComponent;
	let fixture: ComponentFixture<DialogChooseColumnsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_TAGEDITOR_MODULE_IMPORTS],
			providers: [...TEST_TAGEDITOR_MODULE_PROVIDERS],
			declarations: [DialogChooseColumnsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChooseColumnsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
