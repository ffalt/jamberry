import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PodcastsLoaderByTypeComponent, PodcastsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('PodcastsLoaderByTypeComponent', () => {
	let component: PodcastsLoaderByTypeComponent;
	let fixture: ComponentFixture<PodcastsLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PodcastsLoaderByTypeComponent, MockComponent(PodcastsLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PodcastsLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
