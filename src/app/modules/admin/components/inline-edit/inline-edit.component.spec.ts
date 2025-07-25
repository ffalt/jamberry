import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {InlineEditComponent} from './inline-edit.component';

describe('InlineEditComponent', () => {
	let component: InlineEditComponent;
	let fixture: ComponentFixture<InlineEditComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [InlineEditComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(InlineEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
