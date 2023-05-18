import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MediaPlaylistItemComponent} from './media-playlist-item.component';

describe('MediaPlaylistItemComponent', () => {
	let component: MediaPlaylistItemComponent;
	let fixture: ComponentFixture<MediaPlaylistItemComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [MediaPlaylistItemComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaPlaylistItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
