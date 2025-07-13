import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {FolderTreeComponent} from '@admin/components';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogChooseFolderComponent} from './dialog-choose-folder.component';

describe('DialogChooseFolderComponent', () => {
	let component: DialogChooseFolderComponent;
	let fixture: ComponentFixture<DialogChooseFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [DialogChooseFolderComponent, FolderTreeComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChooseFolderComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
