import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {AlbumImageComponent, DialogAlbumImageComponent} from '@admin/components';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('DialogAlbumImageComponent', () => {
	let component: DialogAlbumImageComponent;
	let fixture: ComponentFixture<DialogAlbumImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [DialogAlbumImageComponent, MockComponent(AlbumImageComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogAlbumImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
