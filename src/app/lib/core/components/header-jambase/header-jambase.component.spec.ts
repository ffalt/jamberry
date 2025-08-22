import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderJamBaseComponent } from './header-jambase.component';

describe('HeaderJamBaseComponent', () => {
	let component: HeaderJamBaseComponent;
	let fixture: ComponentFixture<HeaderJamBaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [HeaderJamBaseComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderJamBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
