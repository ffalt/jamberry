import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogOverlayModule, DialogOverlayService } from '@modules/dialog-overlay';
import { CellEditorComponent } from './cell-editor.component';
import { FrameType } from '../../model/id3v2-frames.helper';
import type { RawTagEditCell } from '../../model/tag-editor.types';
import { DialogTagSyncedLyricsComponent, type SyncedLyricsEdit } from '../dialog-tag-synced-lyrics/dialog-tag-synced-lyrics.component';
import { DialogTagLyricsComponent } from '../dialog-tag-lyrics/dialog-tag-lyrics.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CellEditorComponent', () => {
	let component: CellEditorComponent;
	let fixture: ComponentFixture<CellEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogOverlayModule, CellEditorComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CellEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('opens a synced lyrics dialog when the synced lyrics cell is clicked', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');

		component.clickEvent();

		expect(open).toHaveBeenCalledOnce();
		expect(open.mock.calls[0][0]?.childComponent).toBe(DialogTagSyncedLyricsComponent);
		expect(cell.changed).toBe(false);
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('still opens the plain lyrics editor for USLT', async () => {
		const cell = {
			column: { def: { id: 'USLT', impl: FrameType.LangDescText } },
			frames: [],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');

		component.clickEvent();

		expect(open.mock.calls[0][0]?.childComponent).toBe(DialogTagLyricsComponent);
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('does not mark an unchanged empty synced lyrics cell as changed', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');
		component.clickEvent();
		await fixture.whenStable();

		await open.mock.calls[0][0]?.onOkBtn?.();

		expect(cell.frames).toEqual([]);
		expect(cell.changed).toBe(false);
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('applies edited synced lyrics only on confirmation and marks the row changed', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [{ id: 'SYLT', value: { id: 'lyrics', language: 'eng', timestampFormat: 2, contentType: 1, events: [{ timestamp: 1234, text: 'Original' }] } }],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');
		component.clickEvent();
		await fixture.whenStable();
		const config = open.mock.calls[0][0];
		const data = config?.data as SyncedLyricsEdit;
		const frame = data.result?.[0];
		if (!(frame && config?.onOkBtn)) throw new Error('Dialog did not initialize');
		frame.value.events[0].text = 'Edited';
		expect(cell.frames[0].value).toEqual(expect.objectContaining({ events: [{ timestamp: 1234, text: 'Original' }] }));

		await config.onOkBtn();

		expect(cell.frames[0].value).toEqual(expect.objectContaining({ language: 'eng', events: [{ timestamp: 1234, text: 'Edited' }] }));
		expect(cell.changed).toBe(true);
		expect(cell.parent.changed).toBe(true);
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('does not apply invalid timestamps and keeps the cell unchanged', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [{ id: 'SYLT', value: { id: 'lyrics', language: 'und', timestampFormat: 2, contentType: 1, events: [{ timestamp: 100, text: 'Original' }] } }],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');
		component.clickEvent();
		await fixture.whenStable();
		const config = open.mock.calls[0][0];
		const data = config?.data as SyncedLyricsEdit;
		const frame = data.result?.[0];
		if (!(frame && config?.onOkBtn)) throw new Error('Dialog did not initialize');
		frame.value.events[0].timestamp = -1;

		await expect(config.onOkBtn()).rejects.toThrow('Invalid synced lyrics timestamps');
		expect(cell.changed).toBe(false);
		expect(cell.frames[0].value).toEqual(expect.objectContaining({ events: [{ timestamp: 100, text: 'Original' }] }));
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('sorts edited timestamps while preserving other frame metadata', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [{ id: 'SYLT', value: { id: 'lyrics', language: 'eng', timestampFormat: 1, contentType: 2, events: [{ timestamp: 200, text: 'Later' }] } }],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');
		component.clickEvent();
		await fixture.whenStable();
		const config = open.mock.calls[0][0];
		const data = config?.data as SyncedLyricsEdit;
		const frame = data.result?.[0];
		if (!(frame && config?.onOkBtn)) throw new Error('Dialog did not initialize');
		frame.value.events.push({ timestamp: 100, text: 'Earlier' });
		await config.onOkBtn();

		expect(cell.frames[0].value).toEqual({
			id: 'lyrics', language: 'eng', timestampFormat: 1, contentType: 2,
			events: [{ timestamp: 100, text: 'Earlier' }, { timestamp: 200, text: 'Later' }]
		});
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});

	it('leaves the original synced lyrics unchanged on cancellation', async () => {
		const cell = {
			column: { def: { id: 'SYLT', impl: FrameType.SYLT } },
			frames: [{ id: 'SYLT', value: { id: 'lyrics', language: 'und', timestampFormat: 2, contentType: 1, events: [{ timestamp: 100, text: 'Original' }] } }],
			changed: false,
			parent: { changed: false }
		} as unknown as RawTagEditCell<unknown>;
		fixture.componentRef.setInput('cell', cell);
		await fixture.whenStable();
		const open = vi.spyOn(TestBed.inject(DialogOverlayService), 'open');
		component.clickEvent();
		await fixture.whenStable();
		const config = open.mock.calls[0][0];
		const data = config?.data as SyncedLyricsEdit;
		const frame = data.result?.[0];
		if (!(frame && config?.onCancelBtn)) throw new Error('Dialog did not initialize');
		frame.value.events[0].text = 'Discarded';
		await config.onCancelBtn();

		expect(cell.frames[0].value).toEqual(expect.objectContaining({ events: [{ timestamp: 100, text: 'Original' }] }));
		expect(cell.changed).toBe(false);
		open.mock.results[0].value.componentInstance?.close();
		open.mockRestore();
	});
});
