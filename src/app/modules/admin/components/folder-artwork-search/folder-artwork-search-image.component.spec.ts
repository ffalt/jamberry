import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ArtworkListComponent} from '@admin/components/artwork-list/artwork-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {FolderArtworkSearchImageComponent} from './folder-artwork-search-image.component';

describe('ArtistImageComponent', () => {
	let component: FolderArtworkSearchImageComponent;
	let fixture: ComponentFixture<FolderArtworkSearchImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [FolderArtworkSearchImageComponent, MockComponent(ArtworkListComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderArtworkSearchImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
