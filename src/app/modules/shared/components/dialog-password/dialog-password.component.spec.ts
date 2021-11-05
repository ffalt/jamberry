import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogPasswordComponent} from './dialog-password.component';

describe('DialogPasswordComponent', () => {
	let component: DialogPasswordComponent;
	let fixture: ComponentFixture<DialogPasswordComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [DialogPasswordComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
