import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodeStateButtonComponent} from '@library/components/episode-state-button/episode-state.button.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {EpisodeOverviewComponent} from './episode-overview.component';

describe('EpisodeOverviewComponent', () => {
	let component: EpisodeOverviewComponent;
	let fixture: ComponentFixture<EpisodeOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [EpisodeOverviewComponent, MockComponent(EpisodeStateButtonComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EpisodeOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
