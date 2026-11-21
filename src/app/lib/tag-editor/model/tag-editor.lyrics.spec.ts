import { describe, expect, it, vi } from 'vitest';
import { type Jam, JamObjectType, type JamService } from '@jam';
import { TagEditor } from './tag-editor.class';
import { rebuildTag } from './tag-editor.utils';

function setup(frames: Jam.MediaTagRawFrames = {}) {
	const metadata = { lcrlibSearch: vi.fn(), lyricsovhSearch: vi.fn() };
	const editor = new TagEditor({ metadata } as unknown as JamService);
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
	return { editor, track, metadata };
}

describe('TagEditor.findMissingLyrics', () => {
	it('writes both plain and synced LRCLIB lyrics and preserves other edits', async () => {
		const { editor, metadata } = setup();
		const title = editor.columns.find(column => column.def.id === 'TIT2');
		if (!title) throw new Error('Missing title column');
		editor.updateEditTextCell(editor.edits[0], title, 'Edited song');
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 'Plain lyrics', syncedLyrics: '[00:01.25]Plain lyrics' } });

		await editor.findMissingLyrics();

		expect(metadata.lcrlibSearch).toHaveBeenCalledWith({ title: 'Edited song', artist: 'Artist', album: 'Album', duration: 170 });
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
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

	it('derives plain lyrics from a synced-only LRCLIB result', async () => {
		const { editor, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { syncedLyrics: '[00:01.00]First\n[00:02.00]Second' } });

		await editor.findMissingLyrics();

		const tag = rebuildTag(editor.edits[0]);
		expect(tag.frames.USLT?.[0].value.text).toBe('First\nSecond');
		expect(tag.frames.SYLT).toHaveLength(1);
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('uses OVH only when LRCLIB has neither lyrics format', async () => {
		const { editor, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: {} });
		metadata.lyricsovhSearch.mockResolvedValue({ data: { lyrics: 'OVH lyrics' } });

		await editor.findMissingLyrics();

		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('OVH lyrics');
		expect(metadata.lyricsovhSearch).toHaveBeenCalledWith({ artist: 'Artist', title: 'Song' });
	});

	it('keeps unsynced LRCLIB lyrics without querying OVH', async () => {
		const { editor, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 'Plain only' } });

		await editor.findMissingLyrics();

		expect(rebuildTag(editor.edits[0]).frames.USLT?.[0].value.text).toBe('Plain only');
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('processes every track when adding the synced lyrics column', async () => {
		const { editor, track, metadata } = setup();
		const second: Jam.Track = { ...track, id: 'second', name: 'Second.mp3' };
		editor.build([track, second]);
		metadata.lcrlibSearch
			.mockResolvedValueOnce({ data: { plainLyrics: 'First', syncedLyrics: '[00:01.00]First' } })
			.mockResolvedValueOnce({ data: { plainLyrics: 'Second', syncedLyrics: '[00:02.00]Second' } });

		await editor.findMissingLyrics();

		expect(editor.edits).toHaveLength(2);
		expect(editor.edits.map(edit => rebuildTag(edit).frames.USLT?.[0].value.text)).toEqual(['First', 'Second']);
		expect(editor.edits.map(edit => rebuildTag(edit).frames.SYLT?.length)).toEqual([1, 1]);
	});

	it('leaves a track unchanged when neither service finds lyrics', async () => {
		const { editor, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: {} });
		metadata.lyricsovhSearch.mockResolvedValue({ data: {} });

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

		expect(metadata.lcrlibSearch).not.toHaveBeenCalled();
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('does not overwrite lyrics edited while the lookup is pending', async () => {
		const { editor, metadata } = setup();
		const response = Promise.withResolvers<{ data: { plainLyrics: string } }>();
		metadata.lcrlibSearch.mockReturnValue(response.promise);

		const pending = editor.findMissingLyrics();
		const column = editor.columns.find(item => item.def.id === 'USLT');
		if (!column) throw new Error('Missing lyrics column');
		editor.updateEditTextCell(editor.edits[0], column, 'User edit');
		response.resolve({ data: { plainLyrics: 'External lyrics' } });
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
		metadata.lcrlibSearch
			.mockResolvedValueOnce({ data: { plainLyrics: 'External first', syncedLyrics: '[00:01.00]First' } })
			.mockResolvedValueOnce({ data: { plainLyrics: 'External second', syncedLyrics: '[00:02.00]Second' } });

		await editor.findMissingLyrics();

		expect(metadata.lcrlibSearch).toHaveBeenCalledTimes(2);
		const tags = editor.edits.map(edit => rebuildTag(edit));
		expect(tags.map(tag => tag.frames.USLT?.[0].value.text)).toEqual(['Existing lyrics', 'Existing lyrics']);
		expect(tags.map(tag => tag.frames.SYLT?.[0].value.events)).toEqual([
			[{ timestamp: 1000, text: 'First' }],
			[{ timestamp: 2000, text: 'Second' }]
		]);
	});

	it('does not search when both plain and synced lyrics already exist', async () => {
		const existing = { id: 'SYLT', value: { id: 'existing', language: 'und', timestampFormat: 2, contentType: 1, events: [] } };
		const { editor, metadata } = setup({
			USLT: [{ id: 'USLT', value: { id: '', language: '', text: 'Existing lyrics' } }],
			SYLT: [existing]
		});

		await editor.findMissingLyrics();

		expect(metadata.lcrlibSearch).not.toHaveBeenCalled();
		expect(rebuildTag(editor.edits[0]).frames.SYLT).toEqual([existing]);
	});

	it('does not replace existing synced lyrics when filling plain lyrics', async () => {
		const existing = { id: 'SYLT', value: { id: 'existing', language: 'und', timestampFormat: 2, contentType: 1, events: [] } };
		const { editor, metadata } = setup({ SYLT: [existing] });
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 'Plain', syncedLyrics: '[00:01.00]New' } });

		await editor.findMissingLyrics();

		const tag = rebuildTag(editor.edits[0]);
		expect(tag.frames.USLT?.[0].value.text).toBe('Plain');
		expect(tag.frames.SYLT).toEqual([existing]);
	});

	it('propagates LRCLIB errors rather than falling back', async () => {
		const { editor, metadata } = setup();
		const error = new Error('LRCLIB unavailable');
		metadata.lcrlibSearch.mockRejectedValue(error);

		await expect(editor.findMissingLyrics()).rejects.toThrow(error);
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});
});
