import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodesLoaderComponent, PodcastsLatestEpisodesComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';

describe('PodcastsPageLatestComponent', () => {
	let component: PodcastsLatestEpisodesComponent;
	let fixture: ComponentFixture<PodcastsLatestEpisodesComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [PodcastsLatestEpisodesComponent, EpisodesLoaderComponent],
    teardown: { destroyAfterEach: false }
})
			.compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PodcastsLatestEpisodesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
