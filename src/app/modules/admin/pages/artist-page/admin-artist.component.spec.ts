import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {AlbumListComponent} from '@admin/components';
import {AdminArtistComponent} from '@admin/pages';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('AdminArtistComponent', () => {
	let component: AdminArtistComponent;
	let fixture: ComponentFixture<AdminArtistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_ADMIN_MODULE_IMPORTS],
				providers: [...TEST_ADMIN_MODULE_PROVIDERS],
				declarations: [AdminArtistComponent, MockComponent(AlbumListComponent)]
			}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminArtistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
