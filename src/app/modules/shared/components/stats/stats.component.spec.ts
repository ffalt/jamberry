import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {StatsComponent} from './stats.component';

describe('StatsComponent', () => {
	let component: StatsComponent;
	let fixture: ComponentFixture<StatsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_SHARED_MODULE_IMPORTS],
			providers: [...TEST_SHARED_MODULE_PROVIDERS],
			declarations: [StatsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(StatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
