import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TabsComponent, TracksComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {TrackPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('TrackPageComponent', () => {
	let component: TrackPageComponent;
	let fixture: ComponentFixture<TrackPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TrackPageComponent, MockComponent(TabsComponent), MockComponent(TracksComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TrackPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
