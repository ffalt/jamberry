import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogUserPassComponent } from './dialog-user-pass.component';

describe('DialogUserPassComponent', () => {
	let component: DialogUserPassComponent;
	let fixture: ComponentFixture<DialogUserPassComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogUserPassComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogUserPassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
