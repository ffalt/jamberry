import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodeListComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PodcastPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('PodcastPageComponent', () => {
	let component: PodcastPageComponent;
	let fixture: ComponentFixture<PodcastPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PodcastPageComponent, MockComponent(EpisodeListComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PodcastPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
