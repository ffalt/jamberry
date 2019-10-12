import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbumListComponent} from './album-list.component';

describe('AlbumListComponent', () => {
	let component: AlbumListComponent;
	let fixture: ComponentFixture<AlbumListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [AlbumListComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
