import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RootListComponent} from './root-list.component';

describe('FolderListComponent', () => {
	let component: RootListComponent;
	let fixture: ComponentFixture<RootListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [RootListComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(RootListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
