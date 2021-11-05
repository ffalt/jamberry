import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RateComponent} from '@shared/components/rate/rate.component';
import {DialogRateComponent} from './dialog-rate.component';

describe('DialogRateComponent', () => {
	let component: DialogRateComponent;
	let fixture: ComponentFixture<DialogRateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [DialogRateComponent, RateComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogRateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
