import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EpisodesLoaderComponent, ObjsLoaderComponent, TracksLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {GenrePageComponent} from './genre-page.component';

describe('SearchComponent', () => {
	let component: GenrePageComponent;
	let fixture: ComponentFixture<GenrePageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        GenrePageComponent,
        MockComponent(ObjsLoaderComponent),
        MockComponent(TracksLoaderComponent),
        MockComponent(EpisodesLoaderComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(GenrePageComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
