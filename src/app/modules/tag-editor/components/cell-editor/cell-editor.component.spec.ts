import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {CellEditorDisplayComponent} from '@app/modules/tag-editor/components';
import {CellEditorTxtComponent} from '@app/modules/tag-editor/components/cell-editor-txt/cell-editor-txt.component';
import {CellEditorComponent} from '@app/modules/tag-editor/components/cell-editor/cell-editor.component';
import {MockComponent} from 'ng-mocks';

describe('CellEditorComponent', () => {
	let component: CellEditorComponent;
	let fixture: ComponentFixture<CellEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [DialogOverlayModule],
    declarations: [
        CellEditorComponent,
        MockComponent(CellEditorDisplayComponent),
        MockComponent(CellEditorTxtComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
