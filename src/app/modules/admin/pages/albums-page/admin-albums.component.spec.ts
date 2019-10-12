import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {AlbumListComponent} from '@admin/components';
import {AdminAlbumsComponent} from '@admin/pages';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('AdminAlbumsComponent', () => {
	let component: AdminAlbumsComponent;
	let fixture: ComponentFixture<AdminAlbumsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_ADMIN_MODULE_IMPORTS],
				providers: [...TEST_ADMIN_MODULE_PROVIDERS],
				declarations: [AdminAlbumsComponent, MockComponent(AlbumListComponent)]
			}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminAlbumsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
