import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumListComponent, EpisodeListComponent, ObjPlateComponent, TrackListComponent} from '@library/components';
import {MediaListComponent} from '@library/components/media-list/media-list.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ObjPlateComponent', () => {
	let component: ObjPlateComponent;
	let fixture: ComponentFixture<ObjPlateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        ObjPlateComponent,
        MockComponent(EpisodeListComponent),
        MockComponent(AlbumListComponent),
        MockComponent(TrackListComponent),
        MockComponent(MediaListComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjPlateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
