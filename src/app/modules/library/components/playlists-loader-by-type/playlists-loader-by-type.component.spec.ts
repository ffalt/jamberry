import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlaylistsLoaderByTypeComponent, PlaylistsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('PlaylistsLoaderByTypeComponent', () => {
	let component: PlaylistsLoaderByTypeComponent;
	let fixture: ComponentFixture<PlaylistsLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PlaylistsLoaderByTypeComponent, MockComponent(PlaylistsLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistsLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
