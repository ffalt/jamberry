import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { AdminFolderComponent } from './admin-folder.component';
import { FolderTreeComponent } from '../folder-tree/folder-tree.component';
import { UiStateService } from '@core/services/ui-state/ui-state.service';
import { FolderType, JamService } from '@jam';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, afterEach, vi, type MockInstance } from 'vitest';

describe('AdminFoldersComponent', () => {
	let component: AdminFolderComponent;
	let fixture: ComponentFixture<AdminFolderComponent>;
	let search: MockInstance<JamService['folder']['search']>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, AdminFolderComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		const jam = TestBed.inject(JamService);
		vi.spyOn(jam.auth, 'isLoggedIn').mockReturnValue(true);
		search = vi.spyOn(jam.folder, 'search').mockImplementation(async params => ({
			items: params.parentIDs ? [] : [{ id: 'root', name: 'Music', type: FolderType.collection, level: 0, created: 0 }],
			skip: 0,
			take: 1,
			total: 1
		}));
		TestBed.inject(UiStateService).put('app-admin-folders', ['root']);
		fixture = TestBed.createComponent(AdminFolderComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load the folder tree and restore expanded folders on opening', async () => {
		await fixture.whenStable();
		const tree = fixture.debugElement.query(By.directive(FolderTreeComponent)).componentInstance as FolderTreeComponent;

		expect(search).toHaveBeenCalledWith({ level: 0, folderIncChildFolderCount: true, folderIncTrackCount: true });
		expect(tree.nodes().map(node => node.folder.name)).toEqual(['Music']);
		expect(tree.expandIDs).toEqual(['root']);
		expect(tree.nodes()[0].expanded).toBe(true);
	});
});
