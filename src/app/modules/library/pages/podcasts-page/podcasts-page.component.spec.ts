import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PodcastsComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PodcastsPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('PodcastsPageComponent', () => {
	let component: PodcastsPageComponent;
	let fixture: ComponentFixture<PodcastsPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PodcastsPageComponent, MockComponent(PodcastsComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PodcastsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
