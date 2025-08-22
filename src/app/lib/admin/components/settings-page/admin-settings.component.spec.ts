import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { AdminSettingsComponent } from './admin-settings.component';

describe('AdminSettingsComponent', () => {
	let component: AdminSettingsComponent;
	let fixture: ComponentFixture<AdminSettingsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, AdminSettingsComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
