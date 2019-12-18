import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodesLoaderComponent, ObjsLoaderComponent, TracksLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {GenresPageComponent} from './genres-page.component';

describe('SearchComponent', () => {
	let component: GenresPageComponent;
	let fixture: ComponentFixture<GenresPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				GenresPageComponent,
				MockComponent(ObjsLoaderComponent),
				MockComponent(TracksLoaderComponent),
				MockComponent(EpisodesLoaderComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(GenresPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
