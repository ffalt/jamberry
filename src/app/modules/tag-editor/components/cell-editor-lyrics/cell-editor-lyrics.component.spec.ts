import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {SharedModule} from '@shared/shared.module';
import {CellEditorLyricsComponent} from './cell-editor-pic.component';

describe('CellEditorPicComponent', () => {
	let component: CellEditorLyricsComponent;
	let fixture: ComponentFixture<CellEditorLyricsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogOverlayModule, SharedModule, FormsModule],
			declarations: [CellEditorLyricsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorLyricsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
