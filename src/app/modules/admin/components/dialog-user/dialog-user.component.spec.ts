import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogUserComponent} from './dialog-user.component';

describe('DialogUserComponent', () => {
	let component: DialogUserComponent;
	let fixture: ComponentFixture<DialogUserComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [DialogUserComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogUserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
