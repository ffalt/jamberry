import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TracksLoaderByTypeComponent, TracksLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('TracksLoaderByTypeComponent', () => {
	let component: TracksLoaderByTypeComponent;
	let fixture: ComponentFixture<TracksLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TracksLoaderByTypeComponent, MockComponent(TracksLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TracksLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
