import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { FolderHealthID, type Jam } from '@jam';
import { FolderHealthComponent } from './folder-health.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('FolderHealthComponent', () => {
	let component: FolderHealthComponent;
	let fixture: ComponentFixture<FolderHealthComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, FolderHealthComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderHealthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('settles when hints offer solutions and updates when folder health changes', () => {
		const setSolutions = component.solutions.set.bind(component.solutions);
		let updates = 0;
		vi.spyOn(component.solutions, 'set').mockImplementation(value => {
			if (++updates > 3) {
				throw new Error('Folder health display did not settle');
			}
			setSolutions(value);
		});
		const folder = { id: 'folder-1', name: 'Old name' } as Jam.Folder;
		fixture.componentRef.setInput('folderHealth', {
			folder,
			health: [
				{ id: FolderHealthID.albumMBIDExists, name: 'Missing MusicBrainz ID' },
				{ id: FolderHealthID.albumTagsExists, name: 'Missing album tags' },
				{ id: FolderHealthID.albumNameConform, name: 'Invalid folder name', details: [{ reason: 'Wrong name', expected: 'New name' }] }
			]
		} satisfies Jam.FolderHealth);
		fixture.detectChanges();

		expect(component.solutions().map(solution => solution.name)).toEqual(['Edit Tags', 'Rename']);
		expect(fixture.nativeElement.textContent).toContain('Suggested Name: New name');

		component.solutions.update(solutions => [...solutions]);
		fixture.detectChanges();
		expect(updates).toBe(1);

		fixture.componentRef.setInput('folderHealth', {
			folder,
			health: [{ id: FolderHealthID.albumTracksComplete, name: 'Missing tracks' }]
		} satisfies Jam.FolderHealth);
		fixture.detectChanges();

		expect(component.solutions()).toEqual([]);
		expect(fixture.nativeElement.textContent).toContain('Missing tracks');
		expect(updates).toBe(2);
	});
});
