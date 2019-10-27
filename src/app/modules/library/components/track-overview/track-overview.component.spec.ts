import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackOverviewComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';

describe('TrackOverviewComponent', () => {
	let component: TrackOverviewComponent;
	let fixture: ComponentFixture<TrackOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TrackOverviewComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TrackOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
