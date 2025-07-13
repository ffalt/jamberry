import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {RateComponent} from '@shared/components/rate/rate.component';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {ContextEntryRateComponent} from './context-entry-rate.component';

describe('ContextEntryRateComponent', () => {
	let component: ContextEntryRateComponent;
	let fixture: ComponentFixture<ContextEntryRateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [ContextEntryRateComponent, RateComponent],
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
