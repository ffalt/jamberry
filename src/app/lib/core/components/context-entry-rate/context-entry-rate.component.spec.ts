import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextEntryRateComponent } from './context-entry-rate.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('ContextEntryRateComponent', () => {
	let component: ContextEntryRateComponent;
	let fixture: ComponentFixture<ContextEntryRateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ContextEntryRateComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextEntryRateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
