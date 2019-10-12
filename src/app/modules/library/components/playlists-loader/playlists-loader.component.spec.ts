import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlaylistsComponent, PlaylistsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('PlaylistsLoaderComponent', () => {
	let component: PlaylistsLoaderComponent;
	let fixture: ComponentFixture<PlaylistsLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PlaylistsLoaderComponent, MockComponent(PlaylistsComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistsLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
