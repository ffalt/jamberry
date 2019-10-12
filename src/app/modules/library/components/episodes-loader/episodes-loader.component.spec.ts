import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodesComponent, EpisodesLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('EpisodesLoaderComponent', () => {
	let component: EpisodesLoaderComponent;
	let fixture: ComponentFixture<EpisodesLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [EpisodesLoaderComponent, MockComponent(EpisodesComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EpisodesLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
