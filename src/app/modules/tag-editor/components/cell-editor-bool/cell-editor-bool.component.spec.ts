import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CellEditorBoolComponent} from './cell-editor-bool.component';

describe('CellEditorBoolComponent', () => {
	let component: CellEditorBoolComponent;
	let fixture: ComponentFixture<CellEditorBoolComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CellEditorBoolComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorBoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
