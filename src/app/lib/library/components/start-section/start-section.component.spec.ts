import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { StartSectionComponent } from './start-section.component';

describe('StartSectionComponent', () => {
	let component: StartSectionComponent;
	let fixture: ComponentFixture<StartSectionComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, StartSectionComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
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
