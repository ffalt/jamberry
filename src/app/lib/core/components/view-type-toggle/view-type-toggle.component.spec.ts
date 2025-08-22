import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTypeToggleComponent } from './view-type-toggle.component';

describe('ViewTypeToggleComponent', () => {
	let component: ViewTypeToggleComponent;
	let fixture: ComponentFixture<ViewTypeToggleComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [ViewTypeToggleComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ViewTypeToggleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
