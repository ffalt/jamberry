import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CellEditorBinComponent} from './cell-editor-bin.component';

describe('CellEditorBinComponent', () => {
	let component: CellEditorBinComponent;
	let fixture: ComponentFixture<CellEditorBinComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({declarations: [CellEditorBinComponent]}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorBinComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
