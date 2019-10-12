import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {SharedModule} from '@shared/shared.module';
import {CellEditorPicComponent} from './cell-editor-pic.component';

describe('CellEditorPicComponent', () => {
	let component: CellEditorPicComponent;
	let fixture: ComponentFixture<CellEditorPicComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogOverlayModule, SharedModule, FormsModule],
			declarations: [CellEditorPicComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorPicComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
