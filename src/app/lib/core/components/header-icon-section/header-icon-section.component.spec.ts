import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderIconSectionComponent } from './header-icon-section.component';

describe('HeaderIconSectionComponent', () => {
	let component: HeaderIconSectionComponent;
	let fixture: ComponentFixture<HeaderIconSectionComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [HeaderIconSectionComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderIconSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
