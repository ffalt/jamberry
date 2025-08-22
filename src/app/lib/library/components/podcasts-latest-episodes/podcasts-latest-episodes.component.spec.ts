import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PodcastsLatestEpisodesComponent } from './podcasts-latest-episodes.component';

describe('PodcastsPageLatestComponent', () => {
	let component: PodcastsLatestEpisodesComponent;
	let fixture: ComponentFixture<PodcastsLatestEpisodesComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, PodcastsLatestEpisodesComponent],
			providers: [...TEST_PROVIDERS],
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
