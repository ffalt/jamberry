import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CellEditorTxtComponent } from './cell-editor-txt.component';

describe('CellEditorTxtComponent', () => {
	let component: CellEditorTxtComponent;
	let fixture: ComponentFixture<CellEditorTxtComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, CellEditorTxtComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorTxtComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
