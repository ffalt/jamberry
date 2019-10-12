import {CellEditorBinComponent} from '@app/modules/tag-editor/components/cell-editor-bin/cell-editor-bin.component';
import {CellEditorBoolComponent} from '@app/modules/tag-editor/components/cell-editor-bool/cell-editor-bool.component';
import {CellEditorPicComponent} from '@app/modules/tag-editor/components/cell-editor-pic/cell-editor-pic.component';
import {CellEditorPopmComponent} from '@app/modules/tag-editor/components/cell-editor-popm/cell-editor-popm.component';
import {CellEditorTxtListComponent} from '@app/modules/tag-editor/components/cell-editor-txt-list/cell-editor-txt-list.component';
import {CellEditorTxtComponent} from '@app/modules/tag-editor/components/cell-editor-txt/cell-editor-txt.component';
import {CellEditorComponent} from '@app/modules/tag-editor/components/cell-editor/cell-editor.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('CellEditorComponent', () => {
	let component: CellEditorComponent;
	let fixture: ComponentFixture<CellEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [
				CellEditorComponent,
				MockComponent(CellEditorTxtListComponent),
				MockComponent(CellEditorPopmComponent),
				MockComponent(CellEditorBinComponent),
				MockComponent(CellEditorBoolComponent),
				MockComponent(CellEditorPicComponent),
				MockComponent(CellEditorTxtComponent)
			]
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
