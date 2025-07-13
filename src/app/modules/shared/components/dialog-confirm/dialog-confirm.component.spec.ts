import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogConfirmComponent} from './dialog-confirm.component';

describe('DialogConfirmComponent', () => {
	let component: DialogConfirmComponent;
	let fixture: ComponentFixture<DialogConfirmComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [DialogConfirmComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
