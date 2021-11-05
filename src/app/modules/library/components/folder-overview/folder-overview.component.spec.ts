import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderOverviewComponent, ObjGroupsViewComponent, TrackListComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('FolderOverviewComponent', () => {
	let component: FolderOverviewComponent;
	let fixture: ComponentFixture<FolderOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        FolderOverviewComponent,
        MockComponent(ObjGroupsViewComponent),
        MockComponent(TrackListComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
