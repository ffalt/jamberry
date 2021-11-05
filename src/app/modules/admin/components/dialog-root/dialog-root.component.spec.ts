import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogRootComponent} from './dialog-root.component';

describe('DialogRootComponent', () => {
	let component: DialogRootComponent;
	let fixture: ComponentFixture<DialogRootComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [DialogRootComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogRootComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
