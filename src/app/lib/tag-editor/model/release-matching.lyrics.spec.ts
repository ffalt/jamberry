import { describe, expect, it } from 'vitest';
import type { Matching } from './release-matching.helper';
import { toID3v24 } from './release-matching.id3.helper';

describe('release matching lyric tags', () => {
	it('writes plain and synchronized lyrics into their ID3 frames', () => {
		const match = {
			track: {},
			mbTrack: { title: 'Song', position: 1 },
			lyrics: { lyrics: 'First\nSecond', syncedLyrics: '[00:01.25]First\n[00:02.500]Second' }
		} as unknown as Matching;

		const frames = toID3v24(match, [], [])?.frames;

		expect(frames?.USLT?.[0].value.text).toBe('First\nSecond');
		expect(frames?.SYLT?.[0].value).toEqual({
			id: 'lyrics', language: 'und', timestampFormat: 2, contentType: 1,
			events: [{ timestamp: 1250, text: 'First' }, { timestamp: 2500, text: 'Second' }]
		});
	});

	it('derives plain lyrics when only synced lyrics are available', () => {
		const match = {
			track: {},
			mbTrack: { title: 'Song', position: 1 },
			lyrics: { lyrics: '', syncedLyrics: '[00:01.00]First\n[00:02.00]Second' }
		} as unknown as Matching;

		const frames = toID3v24(match, [], [])?.frames;

		expect(frames?.USLT?.[0].value.text).toBe('First\nSecond');
		expect(frames?.SYLT).toHaveLength(1);
	});
});
