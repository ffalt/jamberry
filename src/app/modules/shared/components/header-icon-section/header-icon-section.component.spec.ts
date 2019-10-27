import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderIconSectionComponent} from './header-icon-section.component';

describe('BackgroundTextComponent', () => {
	let component: HeaderIconSectionComponent;
	let fixture: ComponentFixture<HeaderIconSectionComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [HeaderIconSectionComponent]
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
