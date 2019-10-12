import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TracksComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {TracksPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('TracksPageComponent', () => {
	let component: TracksPageComponent;
	let fixture: ComponentFixture<TracksPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TracksPageComponent, MockComponent(TracksComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TracksPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
