import { Component, inject } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../app.mock';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { AdminRootService } from '@core/services/admin-root/admin-root.service';
import { AdminUserService } from '@core/services/admin-user/admin-user.service';
import { type DialogOverlay, DialogOverlayService } from '@modules/dialog-overlay';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
	selector: 'app-test-admin-dialog-child',
	template: '<span>{{ hasFolderService }}</span>'
})
class TestAdminDialogChildComponent implements DialogOverlay<unknown> {
	readonly hasFolderService = !!inject(AdminFolderService);

	dialogInit(): void {
		// nothing to init
	}
}

describe('AdminComponent', () => {
	let component: AdminComponent;
	let fixture: ComponentFixture<AdminComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, AdminComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

describe('AdminComponent dialogs', () => {
	const adminServices = new Set<unknown>([AdminFolderService, AdminRootService, AdminUserService]);

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, AdminComponent],
			// admin services are only provided by AdminComponent in the app, not at root level
			providers: TEST_PROVIDERS.filter(provider => !adminServices.has(provider)),
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	it('should open dialogs whose content injects admin services', async () => {
		const fixture = TestBed.createComponent(AdminComponent);
		fixture.detectChanges();
		const dialogOverlay = fixture.debugElement.injector.get(DialogOverlayService);
		const dialogRef = dialogOverlay.open({ title: 'Admin Dialog', childComponent: TestAdminDialogChildComponent });
		await fixture.whenStable();

		const body = document.querySelector('.cdk-overlay-pane .overlay-body');
		expect(body?.querySelector('app-test-admin-dialog-child')?.textContent?.trim()).toBe('true');

		dialogRef.close();
		expect(document.querySelector('.cdk-overlay-pane app-dialog-overlay')).toBeNull();
	});
});
