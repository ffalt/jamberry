import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {CellEditorPopmComponent} from './cell-editor-popm.component';

describe('CellEditorPopmComponent', () => {
	let component: CellEditorPopmComponent;
	let fixture: ComponentFixture<CellEditorPopmComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [SharedModule, FormsModule],
			declarations: [CellEditorPopmComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorPopmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
