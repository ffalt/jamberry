import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TagEditorComponent } from './tag-editor.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { FolderType, type Jam, JamObjectType } from '@jam';
import type { ReleaseMatching } from '../match-release/match-release.component';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('TagEditorComponent', () => {
	let component: TagEditorComponent;
	let fixture: ComponentFixture<TagEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_IMPORTS, TagEditorComponent],
				providers: [...TEST_PROVIDERS],
				teardown: { destroyAfterEach: false }
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TagEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it.each(['brainz', 'discogs'] as const)('should display applied %s tags without another editor interaction', async method => {
		const track: Jam.Track = {
			id: 'track', name: 'track.mp3', parentID: 'folder', created: 0, duration: 0, objType: JamObjectType.track,
			tagRaw: { version: 4, frames: { TIT2: [{ id: 'TIT2', value: { text: 'Original title' } }] } }
		};
		component.folder.set({ id: 'folder', name: 'Album', created: 0, level: 0, type: FolderType.album });
		component.tracks.set([track]);
		component.editor.build([track]);
		await fixture.whenStable();
		expect((fixture.nativeElement as HTMLElement).textContent).toContain('Original title');

		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open').mockImplementation(vi.fn());
		component[method]();
		const matching = open.mock.calls[0][0]?.data as ReleaseMatching;
		matching.matchings[0].rawTag = { version: 4, frames: { TIT2: [{ id: 'TIT2', value: { text: 'Matched title' } }] } };
		matching.apply();
		await fixture.whenStable();

		const element = fixture.nativeElement as HTMLElement;
		expect(element.textContent).toContain('Matched title');
		expect(element.textContent).not.toContain('Original title');
		expect(element.querySelector('button.button-primary[title="Save"]')).toBeTruthy();
	});
});
