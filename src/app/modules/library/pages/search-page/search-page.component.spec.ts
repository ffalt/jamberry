import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
	AlbumsLoaderComponent,
	ArtistsLoaderComponent,
	EpisodesLoaderComponent,
	FoldersLoaderComponent,
	PlaylistsLoaderComponent,
	PodcastsLoaderComponent,
	TracksLoaderComponent
} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {SearchPageComponent} from './search-page.component';

describe('SearchComponent', () => {
	let component: SearchPageComponent;
	let fixture: ComponentFixture<SearchPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				SearchPageComponent,
				MockComponent(PlaylistsLoaderComponent),
				MockComponent(ArtistsLoaderComponent),
				MockComponent(FoldersLoaderComponent),
				MockComponent(TracksLoaderComponent),
				MockComponent(AlbumsLoaderComponent),
				MockComponent(EpisodesLoaderComponent),
				MockComponent(PodcastsLoaderComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
