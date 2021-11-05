import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogFolderComponent} from './dialog-folder.component';

describe('DialogFolderComponent', () => {
	let component: DialogFolderComponent;
	let fixture: ComponentFixture<DialogFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [DialogFolderComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogFolderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
