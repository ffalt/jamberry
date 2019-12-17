import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TracksPlaylistComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PlaylistPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('PlaylistPageComponent', () => {
	let component: PlaylistPageComponent;
	let fixture: ComponentFixture<PlaylistPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PlaylistPageComponent, MockComponent(TracksPlaylistComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
