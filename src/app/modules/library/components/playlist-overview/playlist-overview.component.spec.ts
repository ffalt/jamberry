import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MediaPlaylistComponent, PlaylistOverviewComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('PlaylistOverviewComponent', () => {
	let component: PlaylistOverviewComponent;
	let fixture: ComponentFixture<PlaylistOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        PlaylistOverviewComponent, MockComponent(MediaPlaylistComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
