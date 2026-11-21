import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { DialogOverlayRef } from '@modules/dialog-overlay';
import { describe, expect, it, beforeEach } from 'vitest';
import { DialogTagSyncedLyricsComponent, type SyncedLyricsEdit } from './dialog-tag-synced-lyrics.component';

describe('DialogTagSyncedLyricsComponent', () => {
	let fixture: ComponentFixture<DialogTagSyncedLyricsComponent>;
	let component: DialogTagSyncedLyricsComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [DialogTagSyncedLyricsComponent] }).compileComponents();
		fixture = TestBed.createComponent(DialogTagSyncedLyricsComponent);
		component = fixture.componentInstance;
	});

	it('edits a copy of every frame while preserving metadata and millisecond precision', async () => {
		const data: SyncedLyricsEdit = {
			frames: [
				{ id: 'SYLT', value: { id: 'first', language: 'eng', timestampFormat: 2, contentType: 1, events: [{ timestamp: 12_345, text: 'Original' }] } },
				{ id: 'SYLT', value: { id: 'other', language: 'deu', timestampFormat: 1, contentType: 2, events: [{ timestamp: 42, text: 'Other' }] } }
			]
		};
		component.dialogInit({} as DialogOverlayRef, { data });
		await fixture.whenStable();
		const element = fixture.nativeElement as HTMLElement;
		expect(element.textContent).toContain('milliseconds');
		expect(element.textContent).toContain('MPEG frames');
		const inputs = element.querySelectorAll('input');
		inputs[0].value = '12346';
		inputs[0].dispatchEvent(new Event('input'));
		inputs[1].value = 'Edited';
		inputs[1].dispatchEvent(new Event('input'));
		await fixture.whenStable();

		expect(data.frames[0].value.events).toEqual([{ timestamp: 12_345, text: 'Original' }]);
		expect(data.result?.[0].value).toEqual({
			id: 'first', language: 'eng', timestampFormat: 2, contentType: 1, events: [{ timestamp: 12_346, text: 'Edited' }]
		});
		expect(data.result?.[1]).toEqual(data.frames[1]);
		expect(data.validate?.()).toBe(true);
	});

	it('adds and removes lines and frames without mutating the original', () => {
		const data: SyncedLyricsEdit = { frames: [] };
		component.dialogInit({} as DialogOverlayRef, { data });
		const frame = data.result?.[0];
		if (!frame) throw new Error('Missing frame');
		component.addLine(frame);
		frame.value.events[0].text = 'New';
		expect(frame.value.events).toEqual([{ timestamp: 0, text: 'New' }]);
		component.removeLine(frame, 0);
		component.removeFrame(0);
		expect(data.result).toEqual([]);
		expect(data.frames).toEqual([]);
	});

	it.each([-1, 1.5, 4_294_967_296, NaN])('rejects invalid timestamp %s', async timestamp => {
		const data: SyncedLyricsEdit = {
			frames: [{ id: 'SYLT', value: { id: 'lyrics', language: 'und', timestampFormat: 2, contentType: 1, events: [{ timestamp, text: 'Line' }] } }]
		};
		component.dialogInit({} as DialogOverlayRef, { data });
		expect(data.validate?.()).toBe(false);
		await fixture.whenStable();
		expect((fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')?.textContent).toContain('timestamp');
	});
});
