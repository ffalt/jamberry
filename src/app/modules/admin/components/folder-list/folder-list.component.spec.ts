import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderListComponent} from './folder-list.component';

describe('FolderListComponent', () => {
	let component: FolderListComponent;
	let fixture: ComponentFixture<FolderListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [FolderListComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
