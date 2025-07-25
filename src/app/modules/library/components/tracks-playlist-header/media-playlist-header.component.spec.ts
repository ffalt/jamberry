import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MediaPlaylistHeaderComponent} from './media-playlist-header.component';

describe('MediaPlaylistHeaderComponent', () => {
	let component: MediaPlaylistHeaderComponent;
	let fixture: ComponentFixture<MediaPlaylistHeaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [MediaPlaylistHeaderComponent],
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
