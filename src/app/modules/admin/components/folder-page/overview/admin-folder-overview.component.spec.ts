import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ArtworkListComponent, InlineEditComponent} from '@admin/components';
import {AdminFolderOverviewComponent} from '@admin/pages';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

describe('AdminFolderOverviewComponent', () => {
	let component: AdminFolderOverviewComponent;
	let fixture: ComponentFixture<AdminFolderOverviewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_ADMIN_MODULE_IMPORTS],
				providers: [...TEST_ADMIN_MODULE_PROVIDERS],
				declarations: [
					AdminFolderOverviewComponent,
					MockComponent(ArtworkListComponent),
					MockComponent(InlineEditComponent)
				]
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminFolderOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
