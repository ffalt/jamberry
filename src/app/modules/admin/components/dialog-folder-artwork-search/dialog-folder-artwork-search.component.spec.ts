import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {DialogFolderArtworkSearchComponent, FolderArtworkSearchImageComponent} from '@admin/components';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('DialogAlbumImageComponent', () => {
	let component: DialogFolderArtworkSearchComponent;
	let fixture: ComponentFixture<DialogFolderArtworkSearchComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [DialogFolderArtworkSearchComponent, MockComponent(FolderArtworkSearchImageComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogFolderArtworkSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
