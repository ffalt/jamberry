import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {StartSectionComponent} from './start-section.component';

describe('StartSectionComponent', () => {
	let component: StartSectionComponent;
	let fixture: ComponentFixture<StartSectionComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [StartSectionComponent]
		})
			.compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(StartSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
