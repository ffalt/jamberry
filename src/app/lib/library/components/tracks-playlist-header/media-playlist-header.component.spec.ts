import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { MediaPlaylistHeaderComponent } from './media-playlist-header.component';

describe('MediaPlaylistHeaderComponent', () => {
	let component: MediaPlaylistHeaderComponent;
	let fixture: ComponentFixture<MediaPlaylistHeaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, MediaPlaylistHeaderComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaPlaylistHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
