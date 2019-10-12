import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {EpisodeStateButtonComponent} from './episode-state.button.component';

describe('EpisodeStateButtonComponent', () => {
	let component: EpisodeStateButtonComponent;
	let fixture: ComponentFixture<EpisodeStateButtonComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [EpisodeStateButtonComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EpisodeStateButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
