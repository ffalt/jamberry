import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {TrackListComponent} from '@admin/components';
import {AdminAlbumComponent} from '@admin/pages';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('AdminAlbumComponent', () => {
	let component: AdminAlbumComponent;
	let fixture: ComponentFixture<AdminAlbumComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [AdminAlbumComponent, MockComponent(TrackListComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminAlbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
