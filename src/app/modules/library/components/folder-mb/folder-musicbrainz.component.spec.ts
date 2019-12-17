import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MbArtistComponent, ObjGroupsViewComponent, TabsComponent, TrackListComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {FolderPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('FolderPageComponent', () => {
	let component: FolderPageComponent;
	let fixture: ComponentFixture<FolderPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				FolderPageComponent,
				MockComponent(ObjGroupsViewComponent),
				MockComponent(TrackListComponent),
				MockComponent(MbArtistComponent),
				MockComponent(TabsComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
