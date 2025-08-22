import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogChooseColumnsComponent } from './dialog-choose-columns.component';

describe('DialogChooseColumnsComponent', () => {
	let component: DialogChooseColumnsComponent;
	let fixture: ComponentFixture<DialogChooseColumnsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogChooseColumnsComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChooseColumnsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
