import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {TrackListComponent} from '@admin/components/track-list/track-list.component';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {AdminFolderTracksComponent} from './admin-folder-tracks.component';

describe('AdminFolderTracksComponent', () => {
	let component: AdminFolderTracksComponent;
	let fixture: ComponentFixture<AdminFolderTracksComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [AdminFolderTracksComponent, MockComponent(TrackListComponent)],
    teardown: { destroyAfterEach: false }
}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderTracksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
