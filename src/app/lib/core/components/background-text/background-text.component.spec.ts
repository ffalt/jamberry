import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundTextComponent } from './background-text.component';

describe('BackgroundTextComponent', () => {
	let component: BackgroundTextComponent;
	let fixture: ComponentFixture<BackgroundTextComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [BackgroundTextComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(BackgroundTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
