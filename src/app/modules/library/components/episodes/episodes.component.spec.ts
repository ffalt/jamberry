import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodesComponent, EpisodeStateButtonComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('EpisodesComponent', () => {
	let component: EpisodesComponent;
	let fixture: ComponentFixture<EpisodesComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [EpisodesComponent, MockComponent(EpisodeStateButtonComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EpisodesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
