import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CellEditorDisplayComponent } from './cell-editor-display.component';

describe('CellEditorDisplayComponent', () => {
	let component: CellEditorDisplayComponent;
	let fixture: ComponentFixture<CellEditorDisplayComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, CellEditorDisplayComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
