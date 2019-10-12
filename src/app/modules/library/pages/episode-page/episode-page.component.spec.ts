import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodeStateButtonComponent} from '@library/components/episode-state-button/episode-state.button.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {EpisodePageComponent} from './episode-page.component';

describe('EpisodePageComponent', () => {
	let component: EpisodePageComponent;
	let fixture: ComponentFixture<EpisodePageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [EpisodePageComponent, MockComponent(EpisodeStateButtonComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EpisodePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
