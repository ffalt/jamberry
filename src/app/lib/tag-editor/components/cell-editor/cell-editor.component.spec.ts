import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogOverlayModule } from '@modules/dialog-overlay';
import { CellEditorComponent } from './cell-editor.component';

describe('CellEditorComponent', () => {
	let component: CellEditorComponent;
	let fixture: ComponentFixture<CellEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogOverlayModule, CellEditorComponent],
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
