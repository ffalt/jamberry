import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {TracksPlaylistComponent} from './tracks-playlist.component';

describe('TracksPlaylistComponent', () => {
	let component: TracksPlaylistComponent;
	let fixture: ComponentFixture<TracksPlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TracksPlaylistComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TracksPlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
