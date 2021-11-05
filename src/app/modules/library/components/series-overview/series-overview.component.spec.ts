import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistOverviewComponent, ObjGroupsViewComponent, TracksLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ArtistOverviewComponent', () => {
	let component: ArtistOverviewComponent;
	let fixture: ComponentFixture<ArtistOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        ArtistOverviewComponent,
        MockComponent(ObjGroupsViewComponent),
        MockComponent(TracksLoaderComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
