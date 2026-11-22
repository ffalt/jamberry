import { describe, expect, it, vi } from 'vitest';
import { type Jam, JamObjectType, type JamService } from '@jam';
import { TagEditor } from './tag-editor.class';
import { rebuildTag } from './tag-editor.utils';

function setup(frames: Jam.MediaTagRawFrames = {}) {
	const metadata = { lyricsSearch: vi.fn() };
	const trackService = { lyricsSidecars: vi.fn().mockResolvedValue({ entries: [] }), lyrics: vi.fn() };
	const editor = new TagEditor({ metadata, track: trackService } as unknown as JamService);
	const track: Jam.Track = {
		id: 'track', name: 'Song.mp3', parentID: 'folder', created: 0, duration: 170_360, objType: JamObjectType.track,
		tagRaw: {
			version: 4,
			frames: {
				TIT2: [{ id: 'TIT2', value: { text: 'Song' } }],
				TPE1: [{ id: 'TPE1', value: { text: 'Artist' } }],
				TALB: [{ id: 'TALB', value: { text: 'Album' } }],
				...frames
			}
		}
	};
	editor.build([track]);
	return { editor, track, metadata, trackService };
}

describe('TagEditor.findMissingLyrics', () => {
	it('copies sidecar lyrics before searching external services', async () => {
		const { editor, trackService, metadata } = setup();
		trackService.lyricsSidecars.mockResolvedValue({ entries: [{ name: 'Song.lrc', synced: true, writtenByJam: false }] });
		trackService.lyrics.mockResolvedValue({ entries: [{ syncedLyrics: '[00:01.00]Sidecar lyrics', source: 'Song.lrc' }] });

		await editor.findMissingLyrics();

		expect(trackService.lyricsSidecars).toHaveBeenCalledWith({ id: 'track' });
		expect(trackService.lyrics).toHaveBeenCalledWith({ id: 'track' });
		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('Sidecar lyrics');
	});

	it('writes plain and synced external lyrics and preserves other edits', async () => {
		const { editor, metadata, trackService } = setup();
		const title = editor.columns.find(column => column.def.id === 'TIT2');
		if (!title) throw new Error('Missing title column');
		editor.updateEditTextCell(editor.edits[0], title, 'Edited song');
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Plain lyrics', syncedLyrics: '[00:01.25]Plain lyrics' }] });

		await editor.findMissingLyrics();

		expect(trackService.lyricsSidecars).toHaveBeenCalledWith({ id: 'track' });
		expect(metadata.lyricsSearch).toHaveBeenCalledWith({ title: 'Edited song', artist: 'Artist', album: 'Album', duration: 170 });
		expect(editor.edits).toHaveLength(1);
		const tag = rebuildTag(editor.edits[0]);
		expect(tag.frames.TIT2?.[0].value.text).toBe('Edited song');
		expect(tag.frames.USLT?.[0].value.text).toBe('Plain lyrics');
		expect(tag.frames.SYLT?.[0].value).toEqual({
			id: 'lyrics', language: 'und', timestampFormat: 2, contentType: 1,
			events: [{ timestamp: 1250, text: 'Plain lyrics' }]
		});
		expect(editor.edits[0].changed).toBe(true);
	});

	it('derives plain lyrics from a synced-only external result', async () => {
		const { editor, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ syncedLyrics: '[00:01.00]First\n[00:02.00]Second' }] });

		await editor.findMissingLyrics();

		const tag = rebuildTag(editor.edits[0]);
		expect(tag.frames.USLT?.[0].value.text).toBe('First\nSecond');
		expect(tag.frames.SYLT).toHaveLength(1);
	});

	it('uses the external lyrics search when no sidecar is available', async () => {
		const { editor, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'External lyrics' }] });

		await editor.findMissingLyrics();

		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('External lyrics');
	});

	it('keeps unsynced external lyrics', async () => {
		const { editor, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Plain only' }] });

		await editor.findMissingLyrics();

		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('Plain only');
	});

	it('processes every track when adding the synced lyrics column', async () => {
		const { editor, track, metadata } = setup();
		const second: Jam.Track = { ...track, id: 'second', name: 'Second.mp3' };
		editor.build([track, second]);
		metadata.lyricsSearch
			.mockResolvedValueOnce({ entries: [{ lyrics: 'First', syncedLyrics: '[00:01.00]First' }] })
			.mockResolvedValueOnce({ entries: [{ lyrics: 'Second', syncedLyrics: '[00:02.00]Second' }] });

		await editor.findMissingLyrics();

		expect(editor.edits).toHaveLength(2);
		expect(editor.edits.map(edit => rebuildTag(edit).frames.USLT?.[0].value.text)).toEqual(['First', 'Second']);
		expect(editor.edits.map(edit => rebuildTag(edit).frames.SYLT?.length)).toEqual([1, 1]);
	});

	it('leaves a track unchanged when no search finds lyrics', async () => {
		const { editor, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [] });

		await editor.findMissingLyrics();

		expect(editor.edits[0].changed).toBe(false);
		expect(rebuildTag(editor.edits[0]).frames.USLT).toBeUndefined();
		expect(rebuildTag(editor.edits[0]).frames.SYLT).toBeUndefined();
	});

	it('does not request lyrics for a track without an artist', async () => {
		const { editor, metadata } = setup();
		const artist = editor.columns.find(column => column.def.id === 'TPE1');
		if (!artist) throw new Error('Missing artist column');
		editor.updateEditTextCell(editor.edits[0], artist, '');

		await editor.findMissingLyrics();

		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
	});

	it('does not overwrite lyrics edited while the lookup is pending', async () => {
		const { editor, metadata } = setup();
		const response = Promise.withResolvers<{ entries: Array<Jam.TrackLyrics> }>();
		metadata.lyricsSearch.mockReturnValue(response.promise);

		const pending = editor.findMissingLyrics();
		const column = editor.columns.find(item => item.def.id === 'USLT');
		if (!column) throw new Error('Missing lyrics column');
		editor.updateEditTextCell(editor.edits[0], column, 'User edit');
		response.resolve({ entries: [{ lyrics: 'External lyrics' }] });
		await pending;

		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('User edit');
	});

	it('fills synced lyrics for every track with existing plain lyrics without replacing them', async () => {
		const { editor, metadata } = setup({
			USLT: [{ id: 'USLT', value: { id: '', language: '', text: 'Existing lyrics' } }]
		});
		const first = editor.edits[0].track;
		const second: Jam.Track = { ...first, id: 'second', name: 'Second.mp3' };
		editor.build([first, second]);
		metadata.lyricsSearch
			.mockResolvedValueOnce({ entries: [{ lyrics: 'External first', syncedLyrics: '[00:01.00]First' }] })
			.mockResolvedValueOnce({ entries: [{ lyrics: 'External second', syncedLyrics: '[00:02.00]Second' }] });

		await editor.findMissingLyrics();

		expect(metadata.lyricsSearch).toHaveBeenCalledTimes(2);
		const tags = editor.edits.map(edit => rebuildTag(edit));
		expect(tags.map(tag => tag.frames.USLT?.[0].value.text)).toEqual(['Existing lyrics', 'Existing lyrics']);
		expect(tags.map(tag => tag.frames.SYLT?.[0].value.events)).toEqual([
			[{ timestamp: 1000, text: 'First' }],
			[{ timestamp: 2000, text: 'Second' }]
		]);
	});

	it('does not search when both plain and synced lyrics already exist', async () => {
		const existing = { id: 'SYLT', value: { id: 'existing', language: 'und', timestampFormat: 2, contentType: 1, events: [] } };
		const { editor, metadata, trackService } = setup({
			USLT: [{ id: 'USLT', value: { id: '', language: '', text: 'Existing lyrics' } }],
			SYLT: [existing]
		});

		await editor.findMissingLyrics();

		expect(trackService.lyricsSidecars).not.toHaveBeenCalled();
		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
		expect(rebuildTag(editor.edits[0]).frames.SYLT).toEqual([existing]);
	});

	it('does not replace existing synced lyrics when filling plain lyrics', async () => {
		const existing = { id: 'SYLT', value: { id: 'existing', language: 'und', timestampFormat: 2, contentType: 1, events: [] } };
		const { editor, metadata } = setup({ SYLT: [existing] });
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Plain', syncedLyrics: '[00:01.00]New' }] });

		await editor.findMissingLyrics();

		const tag = rebuildTag(editor.edits[0]);
		expect(tag.frames.USLT?.[0].value.text).toBe('Plain');
		expect(tag.frames.SYLT).toEqual([existing]);
	});

	it('propagates external lyrics search errors', async () => {
		const { editor, metadata } = setup();
		const error = new Error('External lyrics search unavailable');
		metadata.lyricsSearch.mockRejectedValue(error);

		await expect(editor.findMissingLyrics()).rejects.toThrow(error);
	});
});
