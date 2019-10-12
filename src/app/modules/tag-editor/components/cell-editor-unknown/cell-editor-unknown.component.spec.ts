import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CellEditorUnknownComponent} from './cell-editor-unknown.component';

describe('CellEditorBinComponent', () => {
	let component: CellEditorUnknownComponent;
	let fixture: ComponentFixture<CellEditorUnknownComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({declarations: [CellEditorUnknownComponent]}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorUnknownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
